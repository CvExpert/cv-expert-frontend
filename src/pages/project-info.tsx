import DefaultLayout from '@/layouts/default';
import { useParams } from 'react-router-dom';

const ProjectInfo = () => {
  const { projectid } = useParams();
  return (
    <DefaultLayout>
        {projectid}
    </DefaultLayout>
  )
};

export default ProjectInfo;
