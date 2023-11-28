import useDeleteCustomer from "../../hooks/customers/useDeleteCustomer";
import useCustomToast from "../../hooks/useCustomToast";
import { Customer } from "../../services/customer";
import ModalDialog from "../shared/ModalDialog";

interface Props {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (id: number) => void;
}
const DeleteCustomer = ({
  customer,
  isOpen,
  onClose,
  onDeleteSuccess,
}: Props) => {
  const toast = useCustomToast("حذف مشتری");
  const deleteCustomerService = useDeleteCustomer(
    customer.customerId,
    (message) => {
      toast({
        description: message,
        status: "success",
      });
      onDeleteSuccess(customer.customerId);
    },
    (error) => {
      toast({
        description: error,
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
          deleteCustomerService.mutate();
        }
      }}
    >
      {`در حال حذف کردن مشتری با نام ${customer.customerName} هستید`}
    </ModalDialog>
  );
};

export default DeleteCustomer;
