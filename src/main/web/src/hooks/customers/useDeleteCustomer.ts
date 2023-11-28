import { useMutation } from "react-query";
import { ApiResponse, codeMap, ErrorResponse } from "../../services/code-map";
import CustomerService from "../../services/customer";
import { AxiosError } from "axios";

const useDeleteCustomer = (
  customerId: number,
  onDeleteSuccess: (message: string) => void,
  onDeleteError: (error: string | undefined) => void
) => {
  const customerService = CustomerService<ApiResponse>("/delete");

  return useMutation<ApiResponse, AxiosError<ErrorResponse>>({
    mutationFn: () =>
      customerService.delete({
        params: { customerId: customerId },
      }),
    onError: (error) => onDeleteError(codeMap(error.response?.data.errorCode)),
    onSuccess: (response) => onDeleteSuccess(codeMap(response.code)),
  });
};

export default useDeleteCustomer;
