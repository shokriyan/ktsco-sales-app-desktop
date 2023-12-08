import ApiClient from "./api-client";

export interface AddCustomerRequest {
  customerName: string;
}

export interface Customer {
  customerId: number;
  customerName: string;
  saleTotal: number;
  receivedTotal: number;
}

const CustomerService = <T>(endpoint: string) => {
  return new ApiClient<T>("/api/customer" + endpoint);
};

export default CustomerService;
