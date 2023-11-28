import { SimpleGrid } from "@chakra-ui/react";
import { BillHead } from "../../services/sales-bill";
import TextData from "../shared/buttons/TextData";
import { currency } from "../../hooks/number-format";

interface Props {
  billHead: BillHead;
}
const BillDetailHead = ({ billHead }: Props) => {
  return (
    <SimpleGrid columns={4} gap={10} width="100%">
      <TextData label="شماره بل">{billHead.billNumber}</TextData>
      <TextData label="نام مشتری">{billHead.customer.customerName}</TextData>
      <TextData label="تاریخ بل">{billHead.billDate}</TextData>
      <TextData label="مجموع بل">{currency(billHead.billTotal)}</TextData>
    </SimpleGrid>
  );
};

export default BillDetailHead;
