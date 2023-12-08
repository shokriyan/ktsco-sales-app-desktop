import {
  Divider,
  HStack,
  Spacer,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useBillDetail from "../../hooks/bill/useBillDetail";
import { codeMap } from "../../services/code-map";
import ReceiptDetail from "../receipts/ReceiptDetail";
import Banner from "../shared/Banner";
import LoadSpinner from "../shared/LoadSpinner";
import WarningButton from "../shared/buttons/WarningButton";
import BillDetailHead from "./BillDetailHead";
import BillDetailTable from "./BillDetailTable";
import DeleteSaleBill from "./DeleteSaleBill";

interface Props {
  billNumber: string;
}

const SaleBillDetail = ({ billNumber }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError, error, refetch } =
    useBillDetail(billNumber);
  if (isLoading) return <LoadSpinner />;
  if (!data || isError)
    return (
      <Banner type="error">{codeMap(error?.response?.data.errorCode)}</Banner>
    );
  return (
    <VStack width="100%" align="flex-start" spacing={5}>
      <DeleteSaleBill
        billNumber={data.billNumber}
        isOpen={isOpen}
        onClose={() => onClose()}
        onDeleteSuccess={() => {
          refetch();
        }}
      />
      <HStack width="100%">
        <Spacer />
        <WarningButton onClick={() => onOpen()}>حذف بل فروش</WarningButton>
      </HStack>
      <BillDetailHead billResponse={data} />
      <Divider borderWidth={4} mt={4} mb={4} />
      <BillDetailTable billResponse={data} />
      <Divider borderWidth={4} mt={4} mb={4}></Divider>
      <ReceiptDetail billNumber={billNumber} customer={data.customer} />
    </VStack>
  );
};

export default SaleBillDetail;
