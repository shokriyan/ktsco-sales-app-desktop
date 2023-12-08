import { useState } from "react";
import useAddCustomer from "../../hooks/customers/useAddCustomer";
import useCustomToast from "../../hooks/useCustomToast";
import { AddCustomerRequest, Customer } from "../../services/customer";
import Banner from "../shared/Banner";
import CommonForm, { FormData } from "../shared/CommonForm";
interface Props {
  onAddSuccess: (customer: Customer) => void;
}

const CustomerEntryForm = ({ onAddSuccess }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useCustomToast("ثبت مشتری");
  const initialValues: AddCustomerRequest = {
    customerName: "",
  };
  const formFields: FormData = {
    initialValues: initialValues,
    fields: [
      {
        type: "input",
        name: "customerName",
        label: "نام مشتری",
        isRequired: true,
      },
    ],
    submitButtonText: "ثبت مشتری",
    resetButtonText: "مشتری جدید",
  };

  const addCustomer = useAddCustomer(
    (customer) => {
      toast({
        description: "مشتری با موفقیت ثبت شد",
        status: "success",
      });
      onAddSuccess(customer);
      setErrorMessage("");
    },
    (error) => {
      if (error) setErrorMessage(error);
    }
  );
  return (
    <>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <CommonForm
        formData={formFields}
        onSubmit={(values) => addCustomer.mutate(values)}
      />
    </>
  );
};

export default CustomerEntryForm;
