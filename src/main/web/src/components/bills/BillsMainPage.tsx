import { Heading, VStack } from "@chakra-ui/react";
import FlexBox from "../shared/FlexBox";
import SalesBills from "./SalesBills";

const BillsMainPage = () => {
  return (
    <FlexBox title="بخش فروشات">
      <VStack align="flex-start" width="100%">
        <Heading size={"md"}>فاکتور فروش</Heading>
        <SalesBills />
      </VStack>
    </FlexBox>
  );
};

export default BillsMainPage;
