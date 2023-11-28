import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../hooks/number-format";
import { StockResponse } from "../../services/stock";
import { CustomTable } from "../shared/CustomTable";
import IconBtn from "../shared/buttons/IconBtn";
interface Props {
  report: StockResponse[];
}

const StockReportTable = ({ report }: Props) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<StockResponse>();
  const columns = [
    columnHelper.accessor("product.productId", {
      cell: (info) => info.getValue(),
      header: "کد محصول",
    }),
    columnHelper.accessor("product.productName", {
      cell: (info) => info.getValue(),
      header: "نام محصول",
    }),
    columnHelper.accessor("quantityIn", {
      cell: (info) => numberFormat(info.getValue()),
      header: "تعداد ورودی",
    }),
    columnHelper.accessor("quantityOut", {
      cell: (info) => numberFormat(info.getValue()),
      header: "تعداد خروجی",
    }),
    columnHelper.accessor("stockRemained", {
      cell: (info) => numberFormat(info.getValue()),
      header: "باقیمانده",
    }),
    columnHelper.display({
      id: "detailIcon",
      header: "جزییات",
      cell: (info) => (
        <IconBtn
          icon="detail"
          color="secondary"
          onClick={() => {
            navigate(`/stock/${info.row.original.product.productId}`);
          }}
        />
      ),
    }),
  ];
  return <CustomTable data={report} columns={columns} haveFilter />;
};

export default StockReportTable;
