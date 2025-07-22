import { Card, CardBody, CardFooter } from '@heroui/card';
import { CircularProgress } from '@heroui/progress';
import { Chip } from '@heroui/chip';
import React from 'react';

interface CircularProgressBarProps {
  progress: number; // Progress value (0-10)
  dataPoints: string; // Display text (e.g., "8.5/10")
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, dataPoints }) => {
  // Convert progress from 0-10 scale to 0-100 for the progress circle
  const progressPercentage = (progress / 10) * 100;
  return (
    <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
      <CardBody className="flex justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: 'w-36 h-36 drop-shadow-md',
            indicator: 'stroke-white',
            track: 'stroke-white/10',
            value: 'text-3xl font-semibold text-white',
          }}
          showValueLabel={true}
          strokeWidth={4}
          value={progressPercentage} // Convert 0-10 scale to 0-100
        />
      </CardBody>
      <CardFooter className="flex justify-center items-center pt-0">
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-white/90 text-small font-semibold',
          }}
          variant="bordered"
        >
          {dataPoints} {/* Dynamic data points */}
        </Chip>
      </CardFooter>
    </Card>
  );
};

export default CircularProgressBar;
