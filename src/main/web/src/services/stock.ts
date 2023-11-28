import ApiClient from "./api-client";
import { Product } from "./product";

export interface StockInRequest {
  productId: number;
  inDate: string;
  quantityIn: number;
}

export interface StockSaveResponse {
  stockId: number;
  product: Product;
  inDate: string;
  quantityIn: number;
}

export interface StockResponse {
  product: Product;
  quantityIn: number;
  quantityOut: number;
  stockRemained: number;
}
export interface StockDetailResponse {
  billNumber: number;
  quantityIn: number;
  quantityOut: number;
  date: string;
}

export interface ProductStockResponse {
  product: Product;
  items: StockDetailResponse[];
}

const StockService = <T>(endpoint: string) => {
  return new ApiClient<T>("/api/stock" + endpoint);
};

export default StockService;
