import { Accordion, AccordionItem } from '@heroui/accordion';
import { Progress } from '@heroui/progress';

const FileProgress = () => {
  return (
    <div>
      <span className="text text-5xl">Your Progress</span>
      <div className="m-2 space-y-5">
        <Progress
          classNames={{
            base: 'max-w-md',
            track: 'drop-shadow-md border border-default',
            indicator: 'bg-gradient-to-r from-pink-500 to-red-500',
            label: 'tracking-wider font-medium text-default-600',
            value: 'text-foreground/60',
          }}
          showValueLabel={true}
          value={60}
          radius="sm"
        />
      </div>
      <div className="py-2">
        <Accordion variant="splitted">
          <AccordionItem key="1" aria-label="File Uploaded" title="File Uploaded">
            {}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Detecting Word Length" title="Detecting Word Length">
            {}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Parsing CV/Resume" title="Parsing CV/Resume">
            {}
          </AccordionItem>
          <AccordionItem key="4" aria-label="Scanning Fields" title="Scanning Fields">
            {}
          </AccordionItem>
          <AccordionItem key="5" aria-label="Analyzing Content" title="Analyzing Content">
            {}
          </AccordionItem>
          <AccordionItem key="6" aria-label="Generating Report" title="Generating Report">
            {}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FileProgress;
