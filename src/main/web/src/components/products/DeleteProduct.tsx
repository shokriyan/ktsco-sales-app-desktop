import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import useCustomToast from "../../hooks/useCustomToast";
import { Product } from "../../services/product";
import ModalDialog from "../shared/ModalDialog";
interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (id: number) => void;
}
const DeleteProduct = ({
  product,
  isOpen,
  onClose,
  onDeleteSuccess,
}: Props) => {
  const toast = useCustomToast("حذف محصول");
  const deleteProductService = useDeleteProduct(
    product.productId,
    (message) => {
      toast({
        description: message,
        status: "success",
      });
      onDeleteSuccess(product.productId);
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
          deleteProductService.mutate();
        }
      }}
    >
      {`در حال حذف کردن محصول با نام ${product.productName} هستید`}
    </ModalDialog>
  );
};

export default DeleteProduct;
