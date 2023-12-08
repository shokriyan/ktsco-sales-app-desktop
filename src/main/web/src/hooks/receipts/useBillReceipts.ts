import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ErrorResponse } from "../../services/code-map";
import ReceiptService, { BillReceiptSummary } from "../../services/receipt";

const useBillReceipts = (billNumber: string) => {
  const receiptService = ReceiptService<BillReceiptSummary>("/get");
  return useQuery<BillReceiptSummary, AxiosError<ErrorResponse>>({
    queryFn: () =>
      receiptService.get({
        params: {
          billNumber: billNumber,
        },
      }),
    queryKey: [`receipt_${billNumber}`],
  });
};

export default useBillReceipts;
