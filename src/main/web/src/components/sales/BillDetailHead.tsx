import { Box, SimpleGrid } from "@chakra-ui/react";
import { currency } from "../../hooks/number-format";
import { SaleBillResponse } from "../../services/sales-bill";
import TextData from "../shared/buttons/TextData";

interface Props {
  billResponse: SaleBillResponse;
}
const BillDetailHead = ({ billResponse }: Props) => {
  return (
    <Box
      rounded={5}
      borderWidth={2}
      borderColor="gray"
      p={4}
      width="100%"
      boxShadow="dark-lg"
    >
      <SimpleGrid columns={4} gap={10} width="100%">
        <TextData label="شماره بل">{billResponse.billNumber}</TextData>
        <TextData label="نام مشتری">
          {billResponse.customer.customerName}
        </TextData>
        <TextData label="تاریخ بل">{billResponse.billDate}</TextData>
        <TextData label="مجموع بل">{currency(billResponse.billTotal)}</TextData>
      </SimpleGrid>
    </Box>
  );
};

export default BillDetailHead;
