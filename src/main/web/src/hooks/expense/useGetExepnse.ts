import { useQuery } from "react-query";
import ExpenseService, { ExpenseResponse } from "../../services/expense";

const useGetExpense = (provider?: string, date?: string) => {
  const expenseService = ExpenseService<ExpenseResponse>("/detail");
  return useQuery({
    queryKey: [`Expense_detail_${date}`],
    queryFn: () =>
      expenseService.get({
        params: {
          provider: provider,
          expenseDate: date,
        },
      }),
  });
};

export default useGetExpense;
