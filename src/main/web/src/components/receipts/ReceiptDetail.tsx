import { HStack, Heading, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useBillReceipts from "../../hooks/receipts/useBillReceipts";
import { Customer } from "../../services/customer";
import { ReceiptResponse } from "../../services/receipt";
import ReceiptDetailTable from "./ReceiptDetailTable";
import ReceiptEntryForm from "./ReceiptEntryForm";
import LoadSpinner from "../shared/LoadSpinner";

interface Props {
  billNumber: string;
  customer: Customer;
}

const ReceiptDetail = ({ billNumber, customer }: Props) => {
  const [receiptResponse, setReceiptResponse] = useState<ReceiptResponse[]>([]);
  const { data: receipts, isLoading, refetch } = useBillReceipts(billNumber);
  useEffect(() => {
    if (receipts) setReceiptResponse(receipts.receiptResponses);
  }, [receipts, receiptResponse]);

  if (isLoading) return <LoadSpinner />;
  return (
    <VStack width="100%" spacing={10} align="flex-start">
      <HStack width="60%">
        <Heading size="md">رسید ها</Heading>
        <Spacer></Spacer>
        <Heading color="greenyellow">
          {receipts?.receiptSummary.billReceivedInFull && "رسید شده است"}
        </Heading>
      </HStack>
      {!receipts?.receiptSummary.billReceivedInFull && (
        <ReceiptEntryForm
          billNumber={billNumber}
          customer={customer}
          onSaveSuccess={() => refetch()}
        />
      )}
      <ReceiptDetailTable
        receipts={receiptResponse}
        onDeleteReceipt={(receiptId) => {
          refetch();
          setReceiptResponse(
            receiptResponse.filter((each) => each.receiptId != receiptId)
          );
        }}
      />
    </VStack>
  );
};

export default ReceiptDetail;
