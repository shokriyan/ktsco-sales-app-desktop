import ApiClient from "./api-client";

export interface AddExpenseRequest {
  provider: string;
  expenseDate: string;
  expenseDetails: ExpenseDetail[];
}

export interface ExpenseResponse {
  provider: string;
  expenseDate: string;
  billTotal: number;
  expenseDetails: ExpenseDetail[];
}

export interface ExpenseDetail {
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ExpenseSummary {
  provider: string;
  expenseDate: string;
  expenseTotal: number;
}

export interface ExpenseFilter {
  provider: string;
  startDate: string;
  endDate: string;
}

const ExpenseService = <T>(endpoint: string) => {
  return new ApiClient<T>("/api/expense" + endpoint);
};

export default ExpenseService;
