import { createColumnHelper } from "@tanstack/react-table";
import { currency } from "../../hooks/number-format";
import { BillDetail, SaleBillResponse } from "../../services/sales-bill";
import { CustomTable } from "../shared/CustomTable";
interface Props {
  billResponse: SaleBillResponse;
}

const BillDetailTable = ({ billResponse }: Props) => {
  const columnHelper = createColumnHelper<BillDetail>();
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
  return <CustomTable data={billResponse.billDetails} columns={columns} />;
};

export default BillDetailTable;
