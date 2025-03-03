import { Card, CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { Link } from '@heroui/link';

interface cardProps {
  name: string;
  id: string;
  imgurl: string;
}

const ProjectCard: React.FC<cardProps> = (props) => {
  return (
    <Link href={'/projects/' + props.id}>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="font-bold text-large">{props.name}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={props.imgurl}
            width={270}
            height={270}
          />
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProjectCard;
