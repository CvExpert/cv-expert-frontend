import FileInput from './file-input';
import FileProgress from './file-progress';

const Uploader = () => {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <FileInput />
      </div>
      <div className="w-1/2 p-4">
        <FileProgress />
      </div>
    </div>
  );
};

export default Uploader;
