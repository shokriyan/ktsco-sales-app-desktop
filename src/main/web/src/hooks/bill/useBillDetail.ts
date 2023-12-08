import { useQuery } from "react-query";
import BillService, { SaleBillResponse } from "../../services/sales-bill";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../services/code-map";

const useBillDetail = (billNumber: string | undefined) => {
  const billService = BillService<SaleBillResponse>("/get-bill");
  return useQuery<SaleBillResponse, AxiosError<ErrorResponse>>({
    queryKey: [`bill_${billNumber}`],
    queryFn: () =>
      billService.get({
        params: {
          billNumber: billNumber,
        },
      }),
  });
};

export default useBillDetail;
