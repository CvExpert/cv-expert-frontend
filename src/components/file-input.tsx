import * as React from 'react';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { useGlobalFileState } from '@/states/file-upload-state';
import api from '@/functions/api';
import { useGlobalAuthState } from '@/states/auth-state';
import { useNavigate } from 'react-router-dom';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Extract text from PDF using pdfjs-dist
async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await getDocument(typedArray).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const pageText = await page.getTextContent();
          text += pageText.items.map((item: any) => item.str).join(' ') + '\n';
        }
        resolve(text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

interface GlobalFileState {
  projectName: string | null;
  file: File | null;
  submitted: boolean;
  progress: number;
}


const FileInput: React.FC = () => {
  const {
    state: { projectName, file, submitted },
    setState,
  } = useGlobalFileState();
  const { state: authState } = useGlobalAuthState();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!file || !authState.userID) {
      setErrorMsg('Please select a PDF file and ensure you are logged in.');
      return;
    }
    if (!projectName || projectName.trim() === '') {
      setErrorMsg('Project name is required.');
      return;
    }
    if (file.type !== 'application/pdf') {
      setErrorMsg('Only PDF files are supported for text extraction.');
      return;
    }
    try {
      let text = await extractTextFromPDF(file);
      const payload = {
        userID: authState.userID,
        projectName,
        text,
      };
      const response = await api.post('/file/upload', payload);
      if (!response || response.data?.error) {
        setErrorMsg(response?.data?.error || 'Error uploading file');
        return;
      }
      // Simulate progress increment every second (up to 6)
      setState((prevState: GlobalFileState) => ({
        ...prevState,
        submitted: true,
        progress: 1,
      }));
      let step = 1;
      const timer = setInterval(() => {
        step++;
        setState((prevState: GlobalFileState) => ({
          ...prevState,
          progress: step,
        }));
        if (step >= 6) {
          clearInterval(timer);
          // Redirect to project page if fileID is present
          if (response.data.fileID) {
            navigate(`/projects/${response.data.fileID}`);
          }
        }
      }, 1000);
    } catch (error: any) {
      setErrorMsg(error?.message || 'Error uploading file');
    }
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
        label="Resume/CV (PDF only)"
        labelPlacement="outside"
        name="file"
        placeholder="Upload your file here"
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setState((prevState) => ({ ...prevState, file: selectedFile }));
        }}
      />
      <Button type="submit" variant="bordered" disabled={!file || !authState.userID}>
        Submit
      </Button>
      {errorMsg && (
        <div className="text-small text-danger-500 mt-2">{errorMsg}</div>
      )}
    </Form>
  );
};

export default FileInput;
