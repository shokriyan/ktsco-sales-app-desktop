import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import useSaveProduct from "../../hooks/products/useSaveProduct";
import { Product } from "../../services/product";
import Banner from "../shared/Banner";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import SubmitButton from "../shared/buttons/SubmitButton";
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

  return (
    <>
      {errorMessage && <Banner type="error">{errorMessage}</Banner>}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          saveProductService.mutate(values);
        }}
      >
        {({ handleSubmit, errors, touched, resetForm }) => (
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Flex dir="row" gap={4} alignItems="end">
              <FormControl
                isRequired
                isInvalid={!!errors.productName && touched.productName}
              >
                <FormLabel htmlFor="productName">نام محصول</FormLabel>
                <Field
                  as={Input}
                  id="productName"
                  name="productName"
                  autoComplete="false"
                />
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.unit && touched.unit}>
                <FormLabel htmlFor="unit">واحد شمارش</FormLabel>
                <Field as={Input} id="unit" name="unit" autoComplete="false" />
              </FormControl>
              <SubmitButton>ثبت محصول</SubmitButton>
              <SecondaryButton onClick={() => resetForm()}>
                فرم جدید
              </SecondaryButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
