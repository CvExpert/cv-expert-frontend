import Uploader from '@/components/uploader';
import DefaultLayout from '@/layouts/default';
import { GlobalFileStateProvider } from '@/states/file-upload-state';
import { useGlobalAuthState } from '@/states/auth-state';
import ValidationForm from '@/components/validation';

export default function UploadPage() {
  const authContext = useGlobalAuthState();
  const state = authContext?.state;
  return (
    <DefaultLayout>
      <GlobalFileStateProvider>
        {state.isSignedIn ? <Uploader /> : <ValidationForm />}
      </GlobalFileStateProvider>
    </DefaultLayout>
  );
}
