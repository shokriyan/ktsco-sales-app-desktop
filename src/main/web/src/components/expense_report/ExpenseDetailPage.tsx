import { useNavigate, useParams } from "react-router-dom";
import useGetExpense from "../../hooks/expense/useGetExepnse";
import LoadSpinner from "../shared/LoadSpinner";
import Banner from "../shared/Banner";
import { Divider, VStack } from "@chakra-ui/react";
import ExpenseHead from "./ExpenseHead";
import FlexBox from "../shared/FlexBox";
import ExpenseDetailTable from "./ExpenseDetailTable";
import SecondaryButton from "../shared/buttons/SecondaryButton";

const ExpenseDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: expense,
    isError,
    isLoading,
  } = useGetExpense(params.provider, params.expenseDate);

  if (isLoading) return <LoadSpinner />;
  if (!expense || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return (
    <FlexBox title="بل خریداری">
      <VStack spacing={10} align="flex-start" width="100%">
        <ExpenseHead expense={expense} />
        <Divider mt={4} mb={4} borderWidth={4} rounded="full" />
        <ExpenseDetailTable expense={expense} />
        <VStack alignItems="flex-end" width="100%">
          <SecondaryButton onClick={() => navigate("/expense-report")}>
            برگشت به صفحه قبل
          </SecondaryButton>
        </VStack>
      </VStack>
    </FlexBox>
  );
};

export default ExpenseDetailPage;
