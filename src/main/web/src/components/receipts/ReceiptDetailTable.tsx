import { createColumnHelper } from "@tanstack/react-table";
import { ReceiptResponse } from "../../services/receipt";
import { currency } from "../../hooks/number-format";
import { CustomTable } from "../shared/CustomTable";
import IconBtn from "../shared/buttons/IconBtn";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import DeleteReceipt from "./DeleteReceipt";

interface Props {
  receipts: ReceiptResponse[];
  onDeleteReceipt: (receiptId: number) => void;
}

const ReceiptDetailTable = ({ receipts, onDeleteReceipt }: Props) => {
  const [selectedReceipt, setSeletecedReceipt] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<ReceiptResponse>();
  const columns = [
    columnHelper.accessor("receiptId", {
      header: "شماره رسید",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "توضیحات",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("receiptDate", {
      header: "تاریخ رسید",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("receiptAmount", {
      header: "مبلغ رسید",
      cell: (info) => currency(info.getValue()),
    }),
    columnHelper.display({
      id: "deleteIcon",
      header: "حدف",
      cell: (info) => (
        <IconBtn
          icon="delete"
          color="warning"
          onClick={() => {
            setSeletecedReceipt(info.row.original.receiptId.toString());
            onOpen();
          }}
        />
      ),
    }),
  ];
  return (
    <>
      <DeleteReceipt
        receiptId={selectedReceipt}
        isOpen={isOpen}
        onClose={onClose}
        onDeleteSuccess={(receiptId) => onDeleteReceipt(receiptId)}
      />
      <CustomTable data={receipts} columns={columns} />
    </>
  );
};

export default ReceiptDetailTable;
