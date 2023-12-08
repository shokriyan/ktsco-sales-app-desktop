import { useState } from "react";
import useSaveReceipt from "../../hooks/receipts/userSaveReceipt";
import useCustomToast from "../../hooks/useCustomToast";
import { AddReceiptRequest } from "../../services/receipt";
import Banner from "../shared/Banner";
import CommonForm, { FormData } from "../shared/CommonForm";
import { Customer } from "../../services/customer";

interface Props {
  billNumber: string;
  customer: Customer;
  onSaveSuccess: () => void;
}
const ReceiptEntryForm = ({ billNumber, customer, onSaveSuccess }: Props) => {
  const initialValues: AddReceiptRequest = {
    billNumber: +billNumber,
    customerId: customer.customerId,
    receiptDate: "",
    description: "",
    receiptAmount: 0,
  };
  const receiptFormData: FormData = {
    submitButtonText: "ثبت رسید",
    resetButtonText: "فرم رسید جدید",
    initialValues: initialValues,
    fields: [
      {
        type: "input",
        name: "description",
        label: "توضیحات",
      },
      {
        type: "input",
        name: "receiptDate",
        label: "تاریخ رسید",
        placeholder: "yyyy-MM-dd",
        isRequired: true,
      },
      {
        type: "input",
        name: "receiptAmount",
        label: "مبلغ رسید شده",
        isRequired: true,
      },
    ],
  };
  const taost = useCustomToast("ثبت رسید");
  const [errorMessage, setErrorMessage] = useState("");
  const saveReceiptService = useSaveReceipt(
    (message) => {
      taost({
        description: message,
        status: "success",
      });
      onSaveSuccess();
    },
    (error) => {
      setErrorMessage(error);
    }
  );

  return (
    <>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <CommonForm
        formData={receiptFormData}
        onSubmit={(values: AddReceiptRequest) => {
          values.billNumber = +billNumber;
          values.customerId = customer.customerId;
          saveReceiptService.mutate(values);
          setErrorMessage("");
        }}
        onFormReset={() => setErrorMessage("")}
      />
    </>
  );
};

export default ReceiptEntryForm;
