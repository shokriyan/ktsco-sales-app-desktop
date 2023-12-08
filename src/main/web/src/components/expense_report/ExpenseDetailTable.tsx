import { createColumnHelper } from "@tanstack/react-table";
import { currency } from "../../hooks/number-format";
import { ExpenseDetail, ExpenseResponse } from "../../services/expense";
import { CustomTable } from "../shared/CustomTable";
interface Props {
  expense: ExpenseResponse;
}
const ExpenseDetailTable = ({ expense }: Props) => {
  const columnHelper = createColumnHelper<ExpenseDetail>();
  const columns = [
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "نام جنس",
    }),
    columnHelper.accessor("unit", {
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
  return <CustomTable data={expense.expenseDetails} columns={columns} />;
};

export default ExpenseDetailTable;
