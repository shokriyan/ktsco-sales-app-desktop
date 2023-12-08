import useBillDelete from "../../hooks/bill/useBillDelete";
import useCustomToast from "../../hooks/useCustomToast";
import ModalDialog from "../shared/ModalDialog";
interface Props {
  billNumber: number;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
}

const DeleteSaleBill = ({
  billNumber,
  isOpen,
  onClose,
  onDeleteSuccess,
}: Props) => {
  const toast = useCustomToast("حذف بل فروش");
  const deleteBillService = useBillDelete(
    billNumber,
    (message) => {
      toast({
        description: message,
        status: "success",
      });
      onDeleteSuccess();
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
          deleteBillService.mutate();
        }
      }}
    >
      {`در حال حذف کردن بل فروش با شماره ${billNumber} هستید`}
    </ModalDialog>
  );
};

export default DeleteSaleBill;
