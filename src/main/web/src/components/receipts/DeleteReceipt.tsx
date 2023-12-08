import useReceiptDelete from "../../hooks/receipts/useReceiptDelete";
import useCustomToast from "../../hooks/useCustomToast";
import ModalDialog from "../shared/ModalDialog";
interface Props {
  receiptId: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (receiptId: number) => void;
}

const DeleteReceipt = ({
  receiptId,
  isOpen,
  onClose,
  onDeleteSuccess,
}: Props) => {
  const toast = useCustomToast("حذف رسید");

  const deleteReceiptService = useReceiptDelete(
    receiptId,
    (message) => {
      toast({
        description: message,
        status: "success",
      });
      onDeleteSuccess(+receiptId);
    },
    (errorMessage) => {
      toast({
        description: errorMessage,
        status: "error",
      });
    }
  );
  return (
    <ModalDialog
      title=""
      type="warning"
      isOpen={isOpen}
      onClose={onClose}
      onDialogClose={(result) => {
        if (result) {
          deleteReceiptService.mutate();
        }
      }}
    >
      {`در حال حذف کردن رسید با شماره ${receiptId} هستید`}
    </ModalDialog>
  );
};

export default DeleteReceipt;
