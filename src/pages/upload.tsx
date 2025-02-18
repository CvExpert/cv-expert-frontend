import Uploader from '@/components/uploader';
import ValidationForm from '@/components/validation';
import DefaultLayout from '@/layouts/default';
import { useState } from 'react';
import { GlobalFileStateProvider } from '@/states/file-upload-state';

export default function UploadPage() {
  const [authenticated, setIsAuthenticated] = useState(true);
  return (
    <DefaultLayout>
      <GlobalFileStateProvider>
        {authenticated ? <Uploader /> : <ValidationForm />}
      </GlobalFileStateProvider>
    </DefaultLayout>
  );
}
