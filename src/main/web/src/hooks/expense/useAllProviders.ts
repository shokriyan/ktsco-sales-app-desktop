import { useQuery } from "react-query";
import ExpenseService from "../../services/expense";

const useAllProviders = () => {
  const expenseService = ExpenseService<string>("/providers");
  return useQuery({
    queryFn: expenseService.getAll,
    queryKey: ["providers"],
  });
};
export default useAllProviders;
