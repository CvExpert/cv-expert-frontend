import { useEffect } from 'react';
import { Tabs, Tab } from '@heroui/tabs';
import SignUp from './sign-up';
import SignIn from './sign-in';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { Button } from '@heroui/button';
import { useGlobalAuthState } from '@/states/auth-state';

const ValidationForm = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const authContext = useGlobalAuthState();
  const state = authContext?.state;

  // Automatically open/close modal based on isSignedIn state
  useEffect(() => {
    if (state?.isSignedIn) {
      onClose(); // Close modal if signed in
    } else {
      onOpen(); // Open modal if not signed in
    }
  }, [state?.isSignedIn, onOpen, onClose]); // Runs whenever isSignedIn changes

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="w-full justify-center items-center space-y-4">
                  <Tabs
                    aria-label="Options"
                    className="w-full justify-center items-center space-y-4"
                  >
                    <Tab key="signin" title="Sign In">
                      <SignIn />
                    </Tab>
                    <Tab key="signup" title="Sign Up">
                      <SignUp />
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ValidationForm;
