import DefaultLayout from '@/layouts/default';
import { useState, useEffect } from 'react';
import ProjectCardSkeleton from '@/components/project-skeleton';
import ProjectCard from '@/components/project-card';
import { useGlobalAuthState } from '@/states/auth-state';
import ValidationForm from '@/components/validation';
import api from '@/functions/api';
import { validateAndHydrateAuth } from '@/auth/auth-utils';
import { useNavigate } from 'react-router-dom';
import { Link } from '@heroui/link';

const ProjectComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const { state: authState } = useGlobalAuthState();
  const navigate = useNavigate();
  const noProjects = !isLoading && projects.length === 0;

  async function getProjects() {
    try {
      const userID = authState.userID;
      const response = await api.get('/file/getallfiles', { params: { userID } });
      // Defensive: handle backend returning { data: { ... } } where ... is an object, not array
      if (response?.data?.data) {
        // If data is an array, use it. If it's an object, convert to array of values.
        const data = response.data.data;
        if (Array.isArray(data)) return data;
        if (typeof data === 'object' && data !== null) return Object.values(data);
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const fetchedProjects = await getProjects();
      if (!fetchedProjects || fetchedProjects.length === 0) {
        console.error('No projects found');
        setProjects([]);
      } else {
        setProjects(fetchedProjects);
      }
      setIsLoading(false);
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (noProjects) {
      const timeout = setTimeout(() => {
        navigate('/upload');
      }, 2000); // 2 seconds before redirect
      return () => clearTimeout(timeout);
    }
  }, [noProjects, navigate]);

  if (noProjects) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-16">
        <p className="text-lg mb-4">No projects found. Redirecting to upload...</p>
        <Link href="/upload">
          <button className="px-6 py-2 bg-primary text-white rounded-lg shadow">Upload your first project</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading
        ? Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <ProjectCardSkeleton />
              </div>
            ))
        : projects.map((project, idx) => (
            <div key={project.id || project.fileID || idx}>
              <ProjectCard
                id={project.id || project.fileID || idx}
                imgurl={project.imgurl}
                name={project.name || project.projectName || `Project ${idx + 1}`}
              />
            </div>
          ))}
    </div>
  );
};

const Projects = () => {
  const { state, setState } = useGlobalAuthState();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      await validateAndHydrateAuth(setState);
      setAuthLoading(false);
    };
    hydrate();
    // eslint-disable-next-line
  }, []);

  if (authLoading) return <DefaultLayout><div>Loading...</div></DefaultLayout>;

  return (
    <DefaultLayout>{state.isSignedIn ? <ProjectComponent /> : <ValidationForm />}</DefaultLayout>
  );
};

export default Projects;
