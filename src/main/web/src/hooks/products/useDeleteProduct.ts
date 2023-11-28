import { useMutation } from "react-query";
import { ApiResponse, ErrorResponse, codeMap } from "../../services/code-map";
import ProductService from "../../services/product";
import { AxiosError } from "axios";

const useDeleteProduct = (
  productId: number,
  onDeleteSuccess: (message: string) => void,
  onDeleteError: (error: string) => void
) => {
  const productService = ProductService<ApiResponse>("/delete");
  return useMutation<ApiResponse, AxiosError<ErrorResponse>>({
    mutationFn: () =>
      productService.delete({
        params: {
          productId: productId,
        },
      }),
    onSuccess: (response) => onDeleteSuccess(codeMap(response.code)),
    onError: (error) => onDeleteError(codeMap(error.response?.data.errorCode)),
  });
};

export default useDeleteProduct;
