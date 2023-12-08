import ApiClient from "./api-client";
import { Customer } from "./customer";
import { Product } from "./product";

export interface BillDetailRequest {
  productId: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface SaleBillRequest {
  customerId: number;
  billDate: string;
  billNumber: number;
  billDetails: BillDetailRequest[];
}

export interface BillSummary {
  billNumber: number;
  billTotal: number;
  billDate: string;
  customer: Customer;
  receivedTotal: number;
  receivedInFull: boolean;
}
export interface Summary<T> {
  totalAmount: number;
  items: T[];
}

export interface Bill {
  billId: number;
  billNumber: number;
  billDate: string;
  customer: Customer;
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
export interface SaleBillResponse {
  customer: Customer;
  billNumber: number;
  billDate: string;
  billTotal: number;
  billDetails: BillDetail[];
}

export interface BillDetail {
  billId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

const BillService = <T>(endpoint: string) => {
  return new ApiClient<T>("/api/bill" + endpoint);
};

export default BillService;
