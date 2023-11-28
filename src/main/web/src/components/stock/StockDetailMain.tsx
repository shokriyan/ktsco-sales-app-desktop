import { useParams } from "react-router-dom";
import useStockDetail from "../../hooks/stock/useStockDetail";
import LoadSpinner from "../shared/LoadSpinner";
import Banner from "../shared/Banner";
import FlexBox from "../shared/FlexBox";
import { VStack } from "@chakra-ui/react";
import ProductDispaly from "../products/ProductDispaly";
import ProductDetailTable from "./ProductDetailTable";

const StockDetailMain = () => {
  const params = useParams();
  const productId = params.productId || "";
  const { data: detail, isLoading, isError } = useStockDetail(+productId);
  if (isLoading) return <LoadSpinner />;
  if (!detail || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  console.log(detail);

  return (
    <FlexBox title={"لیست ورود خروج انبار"}>
      <VStack width="100%" spacing={10}>
        <ProductDispaly product={detail.product} />
        <ProductDetailTable items={detail.items} />
      </VStack>
    </FlexBox>
  );
};

export default StockDetailMain;
