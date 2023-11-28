import { AxiosError } from "axios";
import { useMutation } from "react-query";
import CustomerService, {
  AddCustomerRequest,
  Customer,
} from "../../services/customer";
import { ErrorResponse, codeMap } from "../../services/code-map";

const useAddCustomer = (
  onAddCustomer: (customer: Customer) => void,
  onAddError: (errorMessage: string | undefined) => void
) => {
  const customerService = CustomerService<Customer>("/save");

  return useMutation<Customer, AxiosError<ErrorResponse>, AddCustomerRequest>({
    mutationFn: customerService.post,
    onSuccess: (response) => onAddCustomer(response),
    onError: (error) => onAddError(codeMap(error.response?.data.errorCode)),
  });
};

export default useAddCustomer;
