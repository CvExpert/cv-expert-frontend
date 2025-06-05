import * as React from 'react';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { useGlobalFileState } from '@/states/file-upload-state';
import api from '@/functions/api';
import { useGlobalAuthState } from '@/states/auth-state';

// Define the interface for your global file state
interface GlobalFileState {
  projectName: string | null;
  file: File | null;
  submitted: boolean;
  progress: number;
}

type FileInputProps = {
  onStatusChange: (status: number) => void;
};

const FileInput: React.FC<FileInputProps> = ({ onStatusChange }) => {
  const {
    state: { projectName, file, submitted },
    setState,
  } = useGlobalFileState();

  const { state: authState } = useGlobalAuthState(); // ✅ Move hook call here

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = Object.fromEntries(formData);

    const uploadedFile = formData.get('file') as File;
    data.file = uploadedFile ? uploadedFile : null;

    const userID = authState.userID; // ✅ Use hook data here

    // Increment status from 1 to 6 every 5 seconds
    let status = 1;
    onStatusChange(status);

    const interval = setInterval(() => {
      status++;
      if (status <= 6) {
        onStatusChange(status);
      }
      if (status >= 6) {
        clearInterval(interval);
      }
    }, 5000);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file as File);
      formDataUpload.append('userID', userID);
      formDataUpload.append('projectName', projectName || '');

      const response = await api.post(
        '/file/upload',
        formDataUpload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round((progressEvent.loaded / 100) * 100);
            setState((prevState: GlobalFileState) => ({ ...prevState, progress }));
          },
        },
      );
      if (!response) {
        console.error('Error uploading file');
      }
      console.log('File uploaded successfully');
    } catch (error) {
      console.error(error);
    }

    setState((prevState: GlobalFileState) => ({
      ...prevState,
      projectName: data['file-name'],
      file: uploadedFile,
      submitted: true,
      progress: 0,
    }));
  };

  return (
    <Form className="w-full max-w-x p-4 rounded-lg" validationBehavior="native" onSubmit={onSubmit}>
      <Input
        isRequired
        label="Project Name"
        labelPlacement="outside"
        name="file-name"
        placeholder="Enter your project name"
        type="text"
        value={projectName || ''}
        onValueChange={(e) => setState((prevState) => ({ ...prevState, projectName: e }))}
      />
      <Input
        isRequired
        label="Resume/CV"
        labelPlacement="outside"
        name="file"
        placeholder="Upload your file here"
        type="file"
        accept=".pdf, .doc, .docx"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setState((prevState) => ({ ...prevState, file: selectedFile }));
        }}
      />
      <Button type="submit" variant="bordered">
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify({ projectName, file, submitted })}</code>
        </div>
      )}
    </Form>
  );
};

export default FileInput;
