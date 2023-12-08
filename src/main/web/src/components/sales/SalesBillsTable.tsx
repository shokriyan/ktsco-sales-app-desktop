import { VStack } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { currency } from "../../hooks/number-format";
import { BillSummary, Summary } from "../../services/sales-bill";
import { CustomTable } from "../shared/CustomTable";
import IconBtn from "../shared/buttons/IconBtn";
import TextData from "../shared/buttons/TextData";
interface Props {
  summary: Summary<BillSummary>;
}

const SalesBillsTable = ({ summary }: Props) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<BillSummary>();
  const columns = [
    columnHelper.accessor("billNumber", {
      cell: (info) => info.getValue(),
      header: "شماره بل",
    }),
    columnHelper.accessor("customer.customerName", {
      cell: (info) => info.getValue(),
      header: "نام مشتری",
    }),
    columnHelper.accessor("billDate", {
      cell: (info) => info.getValue(),
      header: "تاریخ بل",
    }),
    columnHelper.accessor("billTotal", {
      cell: (info) => currency(info.getValue()),
      header: "مجموع مبلغ بل",
    }),
    columnHelper.accessor("receivedTotal", {
      cell: (info) => currency(info.getValue()),
      header: "مجموع مبلغ رسید",
    }),
    columnHelper.accessor("receivedInFull", {
      cell: (info) => (info.getValue() ? "رسید شده" : "رسید نشده"),
      header: "وضعیت",
    }),
    columnHelper.display({
      id: "detailIcon",
      header: "مشخصات بل",
      cell: (info) => (
        <IconBtn
          icon="detail"
          color="secondary"
          onClick={() => {
            navigate(`/bill/${info.row.original.billNumber}`);
          }}
        />
      ),
    }),
  ];
  return (
    <>
      <VStack mt={10} alignItems={"flex-start"} width={"100%"}>
        <TextData direction="row" label="مجموع کل فروشات">
          {currency(summary.totalAmount)}
        </TextData>
      </VStack>
      <CustomTable data={summary.items} columns={columns} />
    </>
  );
};

export default SalesBillsTable;
