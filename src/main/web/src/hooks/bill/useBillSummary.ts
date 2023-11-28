import { useQuery } from "react-query";
import BillService, { BillSummary, Summary } from "../../services/sales-bill";
import { BillFilter } from "../../components/sales/SaleBillFilter";

const useBillSummary = (billFilter?: BillFilter) => {
  const billService = BillService<Summary<BillSummary>>("/summary");
  return useQuery({
    queryFn: () =>
      billService.get({
        params: {
          customerId: billFilter?.customerId,
          startDate: billFilter?.startDate,
          endDate: billFilter?.endDate,
        },
      }),
    queryKey: ["summary"],
  });
};

export default useBillSummary;
