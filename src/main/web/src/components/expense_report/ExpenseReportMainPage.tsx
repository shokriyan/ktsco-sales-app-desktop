import { VStack } from "@chakra-ui/react";
import FlexBox from "../shared/FlexBox";
import ExpenseReportTable from "./ExpenseReportTable";
import useExpenseSummary from "../../hooks/expense/useExpenseSummary";
import LoadSpinner from "../shared/LoadSpinner";
import Banner from "../shared/Banner";
import { useEffect, useState } from "react";
import { Summary } from "../../services/sales-bill";
import { ExpenseFilter, ExpenseSummary } from "../../services/expense";
import ExpenseFilterForm from "./ExpenseFilterForm";

const ExpenseReportMainPage = () => {
  const [filter, setFilter] = useState<ExpenseFilter>();
  const { data, isError, isLoading, refetch } = useExpenseSummary(filter);
  const [summary, setSummary] = useState<Summary<ExpenseSummary>>();
  useEffect(() => {
    refetch();
    if (data) setSummary(data);
  }, [data, filter]);
  if (isLoading) return <LoadSpinner />;
  if (!summary || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return (
    <FlexBox title="گزارش خریداری">
      <VStack width="100%" spacing={10} align="flex-start">
        <ExpenseFilterForm
          onExpenseFilter={(values) => setFilter(values)}
          onFilterReset={() => setFilter(undefined)}
        />
        <ExpenseReportTable summary={summary} />
      </VStack>
    </FlexBox>
  );
};

export default ExpenseReportMainPage;
