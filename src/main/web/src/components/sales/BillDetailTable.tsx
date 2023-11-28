import { createColumnHelper } from "@tanstack/react-table";
import { Bill } from "../../services/sales-bill";
import { CustomTable } from "../shared/CustomTable";
import { currency } from "../../hooks/number-format";
interface Props {
  bills: Bill[];
}

const BillDetailTable = ({ bills }: Props) => {
  const columnHelper = createColumnHelper<Bill>();
  const columns = [
    columnHelper.accessor("billId", {
      cell: (info) => info.getValue(),
      header: "شماره",
    }),
    columnHelper.accessor("product.productName", {
      cell: (info) => info.getValue(),
      header: "نام جنس",
    }),
    columnHelper.accessor("product.unit", {
      cell: (info) => info.getValue(),
      header: "واحد شمارش",
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => info.getValue(),
      header: "تعداد",
    }),
    columnHelper.accessor("unitPrice", {
      cell: (info) => currency(info.getValue()),
      header: "قیمت",
    }),
    columnHelper.accessor("lineTotal", {
      cell: (info) => currency(info.getValue()),
      header: "مجموع",
    }),
  ];
  return <CustomTable data={bills} columns={columns} />;
};

export default BillDetailTable;
