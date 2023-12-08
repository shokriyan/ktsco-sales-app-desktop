import { useMutation } from "react-query";
import { ApiResponse, ErrorResponse, codeMap } from "../../services/code-map";
import BillService from "../../services/sales-bill";
import { AxiosError } from "axios";

const useBillDelete = (
  billNumber: number,
  onDeleteSuccess: (message: string) => void,
  onDeleteError: (message: string) => void
) => {
  const billService = BillService<ApiResponse>("/delete");
  return useMutation<ApiResponse, AxiosError<ErrorResponse>>({
    mutationFn: () =>
      billService.delete({
        params: {
          billNumber: billNumber,
        },
      }),
    onSuccess: (response) => onDeleteSuccess(codeMap(response.code)),
    onError: (error) => onDeleteError(codeMap(error.response?.data.errorCode)),
  });
};
export default useBillDelete;
