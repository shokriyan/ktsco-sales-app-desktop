import { createColumnHelper } from "@tanstack/react-table";
import useMainStock from "../../hooks/stock/useMainStock";
import Banner from "../shared/Banner";
import LoadSpinner from "../shared/LoadSpinner";
import { StockResponse } from "../../services/stock";
import { CustomTable } from "../shared/CustomTable";
import { numberFormat } from "../../hooks/number-format";
import IconBtn from "../shared/buttons/IconBtn";
import { useNavigate } from "react-router-dom";

const StockReportTable = () => {
  const { data: reprot, isLoading, isError } = useMainStock();
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
  if (isLoading) return <LoadSpinner />;
  if (!reprot || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return <CustomTable data={reprot} columns={columns} haveFilter />;
};

export default StockReportTable;
