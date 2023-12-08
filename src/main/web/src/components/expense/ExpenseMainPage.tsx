import { Heading, VStack } from "@chakra-ui/react";
import FlexBox from "../shared/FlexBox";
import ExpenseBill from "./ExpenseBill";

const ExpenseMainPage = () => {
  return (
    <FlexBox title="بخش خریداری">
      <VStack spacing={10} width="100%" align="flex-start">
        <Heading size="md">ثبت بل خریداری</Heading>
        <ExpenseBill />
      </VStack>
    </FlexBox>
  );
};

export default ExpenseMainPage;
