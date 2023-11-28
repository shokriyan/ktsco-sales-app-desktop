import { VStack } from "@chakra-ui/react";
import FlexBox from "../shared/FlexBox";
import StockEntryForm from "./StockEntryForm";
import useAllProducts from "../../hooks/products/useAllProducts";
import LoadSpinner from "../shared/LoadSpinner";
import Banner from "../shared/Banner";
import StockReportTable from "./StockReportTable";
import useMainStock from "../../hooks/stock/useMainStock";
import { useEffect, useState } from "react";
import { StockResponse } from "../../services/stock";

const StockMainPage = () => {
  const { data: products, isError, isLoading } = useAllProducts();
  const { data, refetch: stockRefetch } = useMainStock();
  const [stockReport, setStockReport] = useState<StockResponse[]>([]);
  useEffect(() => {
    setStockReport(data || []);
  }, [data]);
  if (isLoading) return <LoadSpinner />;
  if (!products || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return (
    <FlexBox title="انبار مرکزی">
      <VStack width="100%" align="flex-start" spacing={10}>
        <StockEntryForm
          products={products}
          onStockSaved={() => {
            stockRefetch();
          }}
        />
        <StockReportTable report={stockReport} />
      </VStack>
    </FlexBox>
  );
};

export default StockMainPage;
