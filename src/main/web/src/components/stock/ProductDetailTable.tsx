import { createColumnHelper } from "@tanstack/react-table";
import { StockDetailResponse } from "../../services/stock";
import { CustomTable } from "../shared/CustomTable";

interface Props {
  items: StockDetailResponse[];
}

const ProductDetailTable = ({ items }: Props) => {
  const columnHelper = createColumnHelper<StockDetailResponse>();
  const columns = [
    columnHelper.accessor("date", {
      header: "تاریخ",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("billNumber", {
      header: "شماره بل فروش",
      cell: (info) => (info.getValue() ? info.getValue() : ""),
    }),
    columnHelper.accessor("quantityOut", {
      header: "تعداد فروخته شده",
      cell: (info) => (info.getValue() ? info.getValue() : ""),
    }),
    columnHelper.accessor("quantityIn", {
      header: "تعداد ورودی انبار",
      cell: (info) => (info.getValue() ? info.getValue() : ""),
    }),
  ];

  return <CustomTable data={items} columns={columns} />;
};

export default ProductDetailTable;
