import { useState } from "react";
import useSaveExpense from "../../hooks/expense/useSaveExpense";
import useCustomToast from "../../hooks/useCustomToast";
import ExpenseBillForm from "./ExpenseBillForm";
import Banner from "../shared/Banner";

const ExpenseBill = () => {
  const toast = useCustomToast("ثبت خریداری");
  const [errorMessage, setErrorMessage] = useState("");
  const saveExpenseService = useSaveExpense(
    (successMessage) => {
      toast({
        description: successMessage,
        status: "success",
      });
    },
    (errorMessage) => {
      if (errorMessage) setErrorMessage(errorMessage);
    }
  );
  return (
    <>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <ExpenseBillForm
        onExpenseSubmit={(values) => {
          setErrorMessage("");
          saveExpenseService.mutate(values);
        }}
        onFormReset={() => {
          setErrorMessage("");
        }}
      />
    </>
  );
};

export default ExpenseBill;
