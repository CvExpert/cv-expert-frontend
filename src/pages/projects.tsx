import DefaultLayout from '@/layouts/default';
import { useState, useEffect } from 'react';
import ProjectCardSkeleton from '@/components/project-skeleton';
import jsonData from '@/data/sample-card-data.json';
import ProjectCard from '@/components/project-card';
import { useGlobalAuthState } from '@/states/auth-state';
import ValidationForm from '@/components/validation';
import api from '@/functions/api';

const ProjectComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state: authState } = useGlobalAuthState();

  async function getProjects() {
    // Simulate an API call to fetch projects
    try{
      const userID = authState.userID; // Get user ID from auth state
      const response = await api.get('/file/getallfiles', { params: { userID } });
      // Assuming response.data contains the projects array
      // Replace jsonData.data with response.data if needed
      console.log(response);
      return response?.data;
    }
    catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  // Simulating data fetching with useEffect (you can replace this with your actual data fetching logic)
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      if (!projects) {
        console.error('No projects found');
        setIsLoading(false);
        return;
      }
      console.log(projects);
      // You may want to set state here, e.g., setProjects(projects);
      // setIsLoading(false); // if you want to stop loading after fetching
    };
    fetchProjects();
  }, []);

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
        : jsonData.data.map((project) => (
            <div key={project.id}>
              <ProjectCard id={project.id} imgurl={project.imgurl} name={project.name} />
            </div>
          ))}
    </div>
  );
};

const Projects = () => {
  const authContext = useGlobalAuthState();
  const state = authContext?.state;

  return (
    <DefaultLayout>{state.isSignedIn ? <ProjectComponent /> : <ValidationForm />}</DefaultLayout>
  );
};

export default Projects;
