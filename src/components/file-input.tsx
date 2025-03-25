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

const FileInput: React.FC = () => {
  // Destructure state and setState from useGlobalFileState
  const {
    state: { projectName, file, submitted },
    setState,
  } = useGlobalFileState();

  // Form submit handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = Object.fromEntries(formData);

    // Handle file selection properly
    const uploadedFile = formData.get('file') as File;
    data.file = uploadedFile ? uploadedFile : null;

    // Get the user id
    const { state } = useGlobalAuthState();
    const userID = state.userID;

    try {
      const response = await api.post(
        '/upload',
        { file, userID, projectName },
        {
          onUploadProgress: (progressEvent) => {
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
    // Update global state on submission
    setState((prevState: GlobalFileState) => ({
      ...prevState,
      projectName: data['file-name'], // Set the project name
      file: uploadedFile, // Set the selected file
      submitted: true, // Indicate that form has been submitted
      progress: 0, // Reset progress
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
        value={projectName || ''} // If projectName is null, use an empty string
        onValueChange={(e) => setState((prevState) => ({ ...prevState, projectName: e }))} // Update projectName in global state
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
          setState((prevState) => ({ ...prevState, file: selectedFile })); // Update file state
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
