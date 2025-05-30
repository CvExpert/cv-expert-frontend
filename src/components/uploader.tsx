import { useState } from 'react';
import FileInput from './file-input';
import FileProgress from './file-progress';

const Uploader = () => {
  const [status, setStatus] = useState<number>(0);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <FileInput onStatusChange={setStatus} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <FileProgress status={status} />
      </div>
    </div>
  );
};

export default Uploader;
