import { Box, SimpleGrid } from "@chakra-ui/react";
import { Product } from "../../services/product";
import TextData from "../shared/buttons/TextData";

interface Props {
  product: Product;
}

const ProductDispaly = ({ product }: Props) => {
  return (
    <Box
      rounded={5}
      borderWidth={1}
      borderColor="gray"
      width="100%"
      p={4}
      boxShadow="dark-lg"
    >
      <SimpleGrid columns={3}>
        <TextData label="کد محصول">{product.productId}</TextData>
        <TextData label="نام محصول">{product.productName}</TextData>
        <TextData label="واحد شمارش">{product.unit}</TextData>
      </SimpleGrid>
    </Box>
  );
};

export default ProductDispaly;
