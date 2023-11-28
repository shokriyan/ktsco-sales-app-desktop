import { useState } from "react";
import useSaveBill from "../../hooks/bill/useSaveBill";
import useGetAllCustomers from "../../hooks/customers/useGetAllCustomers";
import Banner from "../shared/Banner";
import LoadSpinner from "../shared/LoadSpinner";
import SalesBillForm from "./SalesBillForm";
import useAllProducts from "../../hooks/products/useAllProducts";

const SalesBills = () => {
  const { data: customers, isLoading, isError } = useGetAllCustomers();
  const { data: products } = useAllProducts();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const saveBillService = useSaveBill(
    (message) => {
      setSuccessMessage(message);
    },
    (error) => {
      if (error) setErrorMessage(error);
    }
  );
  if (isLoading) return <LoadSpinner />;
  if (!products || !customers || isError)
    return <Banner type="error">خطا در سیستم دوباره تکرار کنید</Banner>;

  return (
    <>
      {successMessage && <Banner type="success">{successMessage}</Banner>}
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <SalesBillForm
        products={products}
        customers={customers}
        onFormSubmit={(request) => {
          saveBillService.mutate(request);
        }}
        onFormReset={() => {
          setSuccessMessage("");
          setErrorMessage("");
        }}
      />
    </>
  );
};

export default SalesBills;
