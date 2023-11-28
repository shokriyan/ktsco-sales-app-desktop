import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import useAddCustomer from "../../hooks/customers/useAddCustomer";
import useCustomToast from "../../hooks/useCustomToast";
import { AddCustomerRequest, Customer } from "../../services/customer";
import Banner from "../shared/Banner";
interface Props {
  onAddSuccess: (customer: Customer) => void;
}

const CustomerEntryForm = ({ onAddSuccess }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useCustomToast("ثبت مشتری");
  const addCustomerForm = useFormik<AddCustomerRequest>({
    initialValues: {
      customerName: "",
    },
    onSubmit: (values) => {
      addCustomer.mutate(values);
    },
  });
  const addCustomer = useAddCustomer(
    (customer) => {
      toast({
        description: "مشتری با موفقیت ثبت شد",
        status: "success",
      });
      addCustomerForm.resetForm();
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
      <form
        onSubmit={addCustomerForm.handleSubmit}
        id="addCustomerForm"
        style={{ width: "100%" }}
      >
        <HStack width="100%">
          <FormControl
            isInvalid={
              !!addCustomerForm.errors.customerName &&
              addCustomerForm.touched.customerName
            }
            isRequired
          >
            <FormLabel htmlFor="customerName">نام مشتری</FormLabel>
            <Input
              id="customerName"
              name="customerName"
              autoComplete="false"
              onChange={addCustomerForm.handleChange}
              value={addCustomerForm.values.customerName}
            />
          </FormControl>
          <HStack verticalAlign="bottom" mt={8}>
            <Button colorScheme="blue" type="submit">
              ثبت مشتری
            </Button>
            <Button
              colorScheme="orange"
              type="button"
              onClick={() => addCustomerForm.resetForm()}
            >
              انصراف
            </Button>
          </HStack>
        </HStack>
      </form>
    </>
  );
};

export default CustomerEntryForm;
