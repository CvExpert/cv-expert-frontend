import { Card, CardBody, CardHeader } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';

const ProjectCardSkeleton = () => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Skeleton className="w-3/5 h-6 rounded-lg" />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Skeleton className="w-[270px] h-[270px] rounded-xl" />
      </CardBody>
    </Card>
  );
};

export default ProjectCardSkeleton;
