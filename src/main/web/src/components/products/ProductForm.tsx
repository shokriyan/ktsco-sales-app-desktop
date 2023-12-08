import { useState } from "react";
import useSaveProduct from "../../hooks/products/useSaveProduct";
import { Product } from "../../services/product";
import Banner from "../shared/Banner";
import CommonForm, { FormData } from "../shared/CommonForm";
interface Props {
  onProductSave: (product: Product) => void;
}
const ProductForm = ({ onProductSave }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const saveProductService = useSaveProduct(
    (product) => {
      setErrorMessage("");
      onProductSave(product);
    },
    (error) => {
      setErrorMessage(error);
    }
  );

  const initialValues = {
    productName: "",
    unit: "",
  };
  const formData: FormData = {
    initialValues: initialValues,
    submitButtonText: "ثبت محصول",
    resetButtonText: "فرم جدید",
    fields: [
      {
        type: "input",
        name: "productName",
        label: "نام محصول",
        isRequired: true,
      },
      {
        type: "input",
        name: "unit",
        label: "واحد شمارش",
        isRequired: true,
      },
    ],
  };

  return (
    <>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <CommonForm
        formData={formData}
        onSubmit={(values) => saveProductService.mutate(values)}
      />
    </>
  );
};

export default ProductForm;
