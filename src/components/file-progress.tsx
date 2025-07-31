import { Accordion, AccordionItem } from '@heroui/accordion';
import { Progress } from '@heroui/progress';
import { useGlobalFileState } from '@/states/file-upload-state';

const FileProgress = ({ visible = true }: { visible?: boolean }) => {
  const { state } = useGlobalFileState();
  const status = state.progress || 0;
  if (!visible) return null;
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
          value={(status / 6) * 100}
          radius="sm"
        />
      </div>
      <div className="py-2">
        <Accordion variant="splitted">
          {/* ...existing AccordionItems... */}
          <AccordionItem
            key="1"
            aria-label="File Uploaded"
            title={`${status >= 1 ? '✅' : '⏳'} File Uploaded`}>
            {
              status >= 1 ? (
                <span className="text-green-500">File has been successfully uploaded.</span>
              ) : (
                <span className="text-yellow-500">Waiting for file upload...</span>
              )
            }
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Detecting Word Length"
            title={`${status >= 2 ? '✅' : '⏳'} Detecting Word Length`}>
            {
              status >= 2 ? (
                <span className="text-green-500">Word length detected.</span>
              ) : (
                <span className="text-yellow-500">Detecting word length...</span>
              )
            }
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Parsing CV/Resume"
            title={`${status >= 3 ? '✅' : '⏳'} Parsing CV/Resume`}>
            {
              status >= 3 ? (
                <span className="text-green-500">CV/Resume parsed successfully.</span>
              ) : (
                <span className="text-yellow-500">Parsing CV/Resume...</span>
              )
            }
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Scanning Fields"
            title={`${status >= 4 ? '✅' : '⏳'} Scanning Fields`}>
            {
              status >= 4 ? (
                <span className="text-green-500">Fields scanned.</span>
              ) : (
                <span className="text-yellow-500">Scanning fields...</span>
              )
            }
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="Analyzing Content"
            title={`${status >= 5 ? '✅' : '⏳'} Analyzing Content`}>
            {
              status >= 5 ? (
                <span className="text-green-500">Content analyzed.</span>
              ) : (
                <span className="text-yellow-500">Analyzing content...</span>
              )
            }
          </AccordionItem>
          <AccordionItem
            key="6"
            aria-label="Generating Report"
            title={`${status >= 6 ? '✅' : '⏳'} Generating Report`}>
            {
              status >= 6 ? (
                <span className="text-green-500">Report generated.</span>
              ) : (
                <span className="text-yellow-500">Generating report...</span>
              )
            }
          </AccordionItem>
        </Accordion>
      </div>
    </div>
)
};

export default FileProgress;
