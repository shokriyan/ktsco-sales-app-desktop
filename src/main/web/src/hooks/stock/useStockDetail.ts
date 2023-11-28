import { useQuery } from "react-query";
import StockService, { ProductStockResponse } from "../../services/stock";

const useStockDetail = (productId: number) => {
  const stockService = StockService<ProductStockResponse>("/detail");
  return useQuery({
    queryFn: () =>
      stockService.get({
        params: {
          productId: productId,
        },
      }),
    queryKey: [`detail_${productId}`],
  });
};
export default useStockDetail;
