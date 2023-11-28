import { useQuery } from "react-query";
import StockService, { StockResponse } from "../../services/stock";

const useMainStock = () => {
  const stockService = StockService<StockResponse>("/stock-report");
  return useQuery({
    queryKey: ["stock_report"],
    queryFn: stockService.getAll,
  });
};

export default useMainStock;
