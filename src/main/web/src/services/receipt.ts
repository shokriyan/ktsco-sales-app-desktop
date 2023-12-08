import ApiClient from "./api-client";

export interface AddReceiptRequest {
  billNumber: number;
  customerId: number;
  receiptDate: string;
  description: string;
  receiptAmount: number;
}

export interface BillReceiptSummary {
  receiptSummary: ReceiptSummary;
  receiptResponses: ReceiptResponse[];
}

export interface ReceiptResponse {
  receiptId: number;
  billNumber: number;
  receiptDate: string;
  description: string;
  receiptAmount: number;
}

export interface ReceiptSummary {
  billNumber: number;
  billReceivedInFull: boolean;
  totalReceipt: number;
}

const ReceiptService = <T>(endpoint: string) => {
  return new ApiClient<T>("/api/receipt" + endpoint);
};

export default ReceiptService;
