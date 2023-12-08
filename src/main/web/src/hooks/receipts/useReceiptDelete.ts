import { useMutation } from "react-query";
import { ApiResponse, ErrorResponse, codeMap } from "../../services/code-map";
import ReceiptService from "../../services/receipt";
import { AxiosError } from "axios";

const useReceiptDelete = (
  receiptId: string,
  onDeleteSuccess: (message: string) => void,
  onDeleteError: (errorMessage: string) => void
) => {
  const receiptService = ReceiptService<ApiResponse>("/delete");
  return useMutation<ApiResponse, AxiosError<ErrorResponse>>({
    mutationFn: () =>
      receiptService.delete({
        params: {
          receiptId: receiptId,
        },
      }),
    onSuccess: (response) => onDeleteSuccess(codeMap(response.code)),
    onError: (error) => onDeleteError(codeMap(error.response?.data.errorCode)),
  });
};

export default useReceiptDelete;
