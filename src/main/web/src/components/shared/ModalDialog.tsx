import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import Banner from "./Banner";

interface Props {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  type?: "dialog" | "warning" | "error";
  onClose: () => void;
  onDialogClose: (result: boolean) => void;
}

const ModalDialog = ({
  title,
  children,
  isOpen,
  type = "dialog",
  onClose,
  onDialogClose,
}: Props) => {
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          onClose();
          onDialogClose(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={4}>
            {type != "dialog" ? <Banner type={type}>{title}</Banner> : title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <PrimaryButton
              onClick={() => {
                onClose();
                onDialogClose(true);
              }}
            >
              {type != "dialog" ? "بله" : "تایید"}
            </PrimaryButton>
            <Spacer></Spacer>
            <SecondaryButton
              onClick={() => {
                onClose();
                onDialogClose(false);
              }}
            >
              خیر / انصراف
            </SecondaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDialog;
