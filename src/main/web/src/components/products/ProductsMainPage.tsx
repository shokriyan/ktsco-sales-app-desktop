import { Divider, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAllProducts from "../../hooks/products/useAllProducts";
import { Product } from "../../services/product";
import Banner from "../shared/Banner";
import FlexBox from "../shared/FlexBox";
import LoadSpinner from "../shared/LoadSpinner";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const ProductsMainPage = () => {
  const { data, isLoading, isError } = useAllProducts();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(data || []);
  }, [data]);
  if (isLoading) return <LoadSpinner />;
  if (!data || isError)
    return <Banner type="error">مشکل در سیستم دوباره تلاش کنید</Banner>;

  return (
    <FlexBox title="محصولات">
      <VStack width="100%" align="flex-start" spacing={4}>
        <ProductForm
          onProductSave={(product) => setProducts([...products, product])}
        />
        <Divider />
        <ProductTable
          products={products}
          onDeleteSuccess={(id) => {
            setProducts(products.filter((each) => each.productId != id));
          }}
        />
      </VStack>
    </FlexBox>
  );
};

export default ProductsMainPage;
