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

const ValidationForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen}>Open Modal</Button>
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
