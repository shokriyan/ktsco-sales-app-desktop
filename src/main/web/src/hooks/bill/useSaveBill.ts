import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ApiResponse, ErrorResponse, codeMap } from "../../services/code-map";
import BillService, { SaleBillRequest } from "../../services/sales-bill";

const useSaveBill = (
  onSaveSuccess: (message: string) => void,
  onSaveError: (message: string | undefined) => void
) => {
  const billService = BillService<ApiResponse>("/save");
  return useMutation<ApiResponse, AxiosError<ErrorResponse>, SaleBillRequest>({
    mutationFn: billService.post,
    onSuccess: (resposne) => onSaveSuccess(codeMap(resposne.code)),
    onError: (error) => onSaveError(codeMap(error.response?.data.errorCode)),
  });
};

export default useSaveBill;
