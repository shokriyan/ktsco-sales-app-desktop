import { useMutation } from "react-query";
import ProductService, {
  AddProductRequest,
  Product,
} from "../../services/product";
import { AxiosError } from "axios";
import { ErrorResponse, codeMap } from "../../services/code-map";

const useSaveProduct = (
  onSaveSuccess: (product: Product) => void,
  onSaveError: (message: string) => void
) => {
  const productService = ProductService<Product>("/save");
  return useMutation<Product, AxiosError<ErrorResponse>, AddProductRequest>({
    mutationFn: productService.post,
    onSuccess: (response) => onSaveSuccess(response),
    onError: (error) => onSaveError(codeMap(error.response?.data.errorCode)),
  });
};

export default useSaveProduct;
