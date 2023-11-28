import ApiClient from "./api-client";

export interface AddProductRequest {
  productName: string;
  unit: string;
}

export interface Product {
  productId: number;
  productName: string;
  unit: string;
}

const ProductService = <T>(endpoint: string) => {
  return new ApiClient<T>("/api/product" + endpoint);
};

export default ProductService;
