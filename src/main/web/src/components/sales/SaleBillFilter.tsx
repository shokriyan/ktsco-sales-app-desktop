import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import useGetAllCustomers from "../../hooks/customers/useGetAllCustomers";
import Banner from "../shared/Banner";
import LoadSpinner from "../shared/LoadSpinner";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import SubmitButton from "../shared/buttons/SubmitButton";
export interface BillFilter {
  customerId?: number;
  startDate?: string;
  endDate?: string;
}
interface Props {
  billFilter?: BillFilter;
  onFilterSelect: (filter: BillFilter) => void;
  onFilterReset: () => void;
}

const SaleBillFilter = ({ onFilterSelect, onFilterReset }: Props) => {
  const { data: customers, isLoading, isError } = useGetAllCustomers();

  const initialValues: BillFilter = {
    customerId: 0,
    startDate: "",
    endDate: "",
  };
  const handleFilterSubmit = (values: BillFilter) => {
    onFilterSelect(values);
  };
  if (isLoading) return <LoadSpinner />;
  if (!customers || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleFilterSubmit(values);
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Flex dir="row" gap={5} align="flex-end">
            <FormControl>
              <FormLabel htmlFor="customerId">نام مشتری</FormLabel>
              <Field
                as={Select}
                id="customerId"
                name="customerId"
                autoComplete="false"
              >
                <option value={0}>انتخاب مشتری</option>
                {customers.map((customer) => (
                  <option
                    key={customer.customerId}
                    value={customer.customerId}
                  >{`${customer.customerId} - ${customer.customerName}`}</option>
                ))}
              </Field>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="startDate">شروع از تاریخ</FormLabel>
              <Field
                as={Input}
                id="startDate"
                name="startDate"
                autoComplete="false"
                placeholder="yyyy-MM-dd"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="endDate">ختم تا تاریخ</FormLabel>
              <Field
                as={Input}
                id="endDate"
                name="endDate"
                autoComplete="false"
                placeholder="yyyy-MM-dd"
              />
            </FormControl>
            <SubmitButton>فیلتر</SubmitButton>
            <SecondaryButton
              onClick={() => {
                resetForm();
                onFilterReset();
              }}
            >
              انصراف
            </SecondaryButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default SaleBillFilter;
