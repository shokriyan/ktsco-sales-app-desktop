import { useMutation } from "react-query";
import { ApiResponse, ErrorResponse, codeMap } from "../../services/code-map";
import ReceiptService, { AddReceiptRequest } from "../../services/receipt";
import { AxiosError } from "axios";

const useSaveReceipt = (
  onSaveSuccess: (message: string) => void,
  onSaveError: (message: string) => void
) => {
  const receiptService = ReceiptService<ApiResponse>("/save");
  return useMutation<ApiResponse, AxiosError<ErrorResponse>, AddReceiptRequest>(
    {
      mutationFn: receiptService.post,
      onSuccess: (response) => onSaveSuccess(codeMap(response.code)),
      onError: (error) => onSaveError(codeMap(error.response?.data.errorCode)),
    }
  );
};

export default useSaveReceipt;
