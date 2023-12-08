import { createColumnHelper } from "@tanstack/react-table";
import { ExpenseSummary } from "../../services/expense";
import { Summary } from "../../services/sales-bill";
import { CustomTable } from "../shared/CustomTable";
import { currency } from "../../hooks/number-format";
import TextData from "../shared/buttons/TextData";
import IconBtn from "../shared/buttons/IconBtn";
import { useNavigate } from "react-router-dom";

interface Props {
  summary: Summary<ExpenseSummary>;
}

const ExpenseReportTable = ({ summary }: Props) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<ExpenseSummary>();
  const columns = [
    columnHelper.accessor("provider", {
      header: "فروشنده",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("expenseDate", {
      header: "تاریخ خریداری",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("expenseTotal", {
      header: "مجموع بل",
      cell: (info) => currency(info.getValue()),
    }),
    columnHelper.display({
      id: "detailIcon",
      header: "مشخصات بل",
      cell: (info) => (
        <IconBtn
          icon="detail"
          color="secondary"
          onClick={() => {
            navigate(
              `/expense/${info.row.original.provider}/${info.row.original.expenseDate}`
            );
          }}
        />
      ),
    }),
  ];
  return (
    <>
      <TextData direction="row" label="مجموع کل خریداری ها">
        {currency(summary.totalAmount)}
      </TextData>
      <CustomTable data={summary.items} columns={columns} />
    </>
  );
};

export default ExpenseReportTable;
