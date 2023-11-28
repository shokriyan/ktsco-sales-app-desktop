import { useQuery } from "react-query";
import CustomerService, { Customer } from "../../services/customer";

const useGetAllCustomers = () => {
  const customerService = CustomerService<Customer>("/all");
  return useQuery({
    queryFn: customerService.getAll,
    queryKey: ["customers"],
  });
};

export default useGetAllCustomers;
