import { useQuery } from "react-query";
import ExpenseService, {
  ExpenseFilter,
  ExpenseSummary,
} from "../../services/expense";
import { Summary } from "../../services/sales-bill";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../services/code-map";

const useExpenseSummary = (filter?: ExpenseFilter) => {
  const expenseService = ExpenseService<Summary<ExpenseSummary>>("/summary");
  return useQuery<Summary<ExpenseSummary>, AxiosError<ErrorResponse>>({
    queryKey: ["expense_summary"],
    queryFn: () =>
      expenseService.get({
        params: {
          provider: filter?.provider,
          startDate: filter?.startDate,
          endDate: filter?.endDate,
        },
      }),
  });
};

export default useExpenseSummary;
