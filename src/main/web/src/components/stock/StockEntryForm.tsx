import { Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useSaveStock from "../../hooks/stock/useSaveStock";
import useCustomToast from "../../hooks/useCustomToast";
import { Product } from "../../services/product";
import { StockInRequest } from "../../services/stock";
import Banner from "../shared/Banner";
import CommonForm, { FormData } from "../shared/CommonForm";
interface Props {
  products: Product[];
  onStockSaved: () => void;
}
const StockEntryForm = ({ products, onStockSaved }: Props) => {
  const toast = useCustomToast("ورودی انبار");
  const [errorMessage, setErrorMessage] = useState("");
  const saveStockService = useSaveStock(
    () => {
      toast({
        title: "ورودی انبار",
        description: "با موفقیت ثبت شد",
        status: "success",
      });
      setErrorMessage("");
      onStockSaved();
    },
    (errorMessage) => {
      toast({
        title: "ورودی انبار",
        description: errorMessage,
        status: "error",
      });
    }
  );
  const initialValues: StockInRequest = {
    productId: 0,
    inDate: "",
    quantityIn: 0,
  };
  const stockFromData: FormData = {
    initialValues: initialValues,
    submitButtonText: "ثبت ورودی",
    resetButtonText: "ورودی جدید",
    fields: [
      {
        type: "select",
        name: "productId",
        label: "نام محصول",
        isRequired: true,
        options: products.map((each) => ({
          value: each.productId,
          text: `${each.productId} - ${each.productName} - ${each.unit}`,
        })),
        placeholder: "نام محصول را انتخاب کنید",
      },
      {
        type: "input",
        name: "inDate",
        label: "تاریخ ورودی",
        isRequired: true,
        placeholder: "yyyy-MM-dd",
      },
      {
        type: "input",
        name: "quantityIn",
        label: "تعداد ورودی",
        isRequired: true,
      },
    ],
  };
  return (
    <VStack align="flex-start" width="100%" spacing={5}>
      <Heading size="md">فرم ثبت ورودی انبار</Heading>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <CommonForm
        formData={stockFromData}
        onSubmit={(values) => {
          setErrorMessage("");
          saveStockService.mutate(values);
        }}
        onFormReset={() => setErrorMessage("")}
      />
    </VStack>
  );
};

export default StockEntryForm;
