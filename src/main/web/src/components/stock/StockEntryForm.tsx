import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import useSaveStock from "../../hooks/stock/useSaveStock";
import useCustomToast from "../../hooks/useCustomToast";
import { Product } from "../../services/product";
import { StockInRequest } from "../../services/stock";
import Banner from "../shared/Banner";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import SubmitButton from "../shared/buttons/SubmitButton";
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
  return (
    <VStack align="flex-start" width="100%" spacing={5}>
      <Heading size="md">فرم ثبت ورودی انبار</Heading>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setErrorMessage("");
          saveStockService.mutate(values);
        }}
      >
        {({ handleSubmit, resetForm, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Flex dir="row" gap={5} align="flex-end" width="100%">
              <FormControl
                isRequired
                isInvalid={!!errors.productId && touched.productId}
              >
                <FormLabel htmlFor="productId">نام مشتری</FormLabel>
                <Field
                  as={Select}
                  id="productId"
                  name="productId"
                  autoComplete="false"
                  validate={(value: any) => {
                    let error;
                    if (!value || value == 0) error = "required";
                    return error;
                  }}
                >
                  <option value={0}>انتخاب محصول</option>
                  {products.map((product) => (
                    <option
                      key={product.productId}
                      value={product.productId}
                    >{`${product.productId} - ${product.productName} - ${product.unit}`}</option>
                  ))}
                </Field>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors.inDate && touched.inDate}
              >
                <FormLabel htmlFor="inDate">تاریخ ورودی</FormLabel>
                <Field
                  as={Input}
                  id="inDate"
                  name="inDate"
                  autoComplete="false"
                  placeholder="yyyy-MM-dd"
                  validate={(value: any) => {
                    let error;
                    if (!value) error = "required";
                    return error;
                  }}
                />
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors.quantityIn && touched.quantityIn}
              >
                <FormLabel htmlFor="quantityIn">تعداد ورودی</FormLabel>
                <Field
                  as={Input}
                  id="quantityIn"
                  name="quantityIn"
                  autoComplete="false"
                  validate={(value: any) => {
                    let error;
                    if (!value || value == 0) error = "required";
                    return error;
                  }}
                />
              </FormControl>
              <SubmitButton isDisabled={!isValid}>ثبت ورودی</SubmitButton>
              <SecondaryButton
                onClick={() => {
                  resetForm();
                  setErrorMessage("");
                }}
              >
                ورودی جدید
              </SecondaryButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default StockEntryForm;
