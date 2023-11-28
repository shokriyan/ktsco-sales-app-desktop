import { useQuery } from "react-query";
import BillService, { Bill } from "../../services/sales-bill";

const useBillDetail = (billNumber: string | undefined) => {
  const billService = BillService<Bill>("/get-bill");
  return useQuery({
    queryKey: [`bill_${billNumber}`],
    queryFn: () =>
      billService.getAll({
        params: {
          billNumber: billNumber,
        },
      }),
  });
};

export default useBillDetail;
