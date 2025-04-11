import DefaultLayout from '@/layouts/default';
import { useState, useEffect } from 'react';
import ProjectCardSkeleton from '@/components/project-skeleton';
import jsonData from '@/data/sample-card-data.json';
import ProjectCard from '@/components/project-card';
import { useGlobalAuthState } from '@/states/auth-state';
import ValidationForm from '@/components/validation';

const ProjectComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetching with useEffect (you can replace this with your actual data fetching logic)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds to simulate data fetching
    }, 3000);
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
