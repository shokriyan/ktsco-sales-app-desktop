import { useQuery } from "react-query";
import ProductService, { Product } from "../../services/product";

const useAllProducts = () => {
  const productService = ProductService<Product>("/get-all");
  return useQuery({
    queryFn: productService.getAll,
    queryKey: ["products"],
  });
};

export default useAllProducts;
