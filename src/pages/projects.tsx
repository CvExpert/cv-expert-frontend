import DefaultLayout from '@/layouts/default';
import { useState, useEffect } from 'react';
import ProjectCardSkeleton from '@/components/project-skeleton';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetching with useEffect (you can replace this with your actual data fetching logic)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds to simulate data fetching
    }, 3000);
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <ProjectCardSkeleton />
              </div>
            ))
        ) : (
          // Render the actual project cards once loading is complete
          // You can replace the following with your actual project cards
          <div>Projects Loaded!</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Projects;
