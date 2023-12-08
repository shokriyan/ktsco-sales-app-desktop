import { useMutation } from "react-query";
import { ApiResponse, ErrorResponse, codeMap } from "../../services/code-map";
import ExpenseService, { AddExpenseRequest } from "../../services/expense";
import { AxiosError } from "axios";

const useSaveExpense = (
  onSaveSuccess: (response: string) => void,
  onSaveError: (message: string) => void
) => {
  const expenseService = ExpenseService<ApiResponse>("/save");
  return useMutation<ApiResponse, AxiosError<ErrorResponse>, AddExpenseRequest>(
    {
      mutationFn: expenseService.post,
      onSuccess: (response) => onSaveSuccess(codeMap(response.code)),
      onError: (error) => onSaveError(codeMap(error.response?.data.errorCode)),
    }
  );
};
export default useSaveExpense;
