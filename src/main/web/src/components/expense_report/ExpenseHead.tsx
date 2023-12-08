import { Box, SimpleGrid } from "@chakra-ui/react";
import { currency } from "../../hooks/number-format";
import { ExpenseResponse } from "../../services/expense";
import TextData from "../shared/buttons/TextData";
interface Props {
  expense: ExpenseResponse;
}
const ExpenseHead = ({ expense }: Props) => {
  return (
    <Box
      rounded={5}
      borderWidth={2}
      borderColor="gray"
      p={4}
      width="100%"
      boxShadow="dark-lg"
    >
      <SimpleGrid columns={3} gap={10}>
        <TextData label="نام فروشنده">{expense.provider}</TextData>
        <TextData label="تاریخ بل">{expense.expenseDate}</TextData>
        <TextData label="مجموع بل">{currency(expense.billTotal)}</TextData>
      </SimpleGrid>
    </Box>
  );
};

export default ExpenseHead;
