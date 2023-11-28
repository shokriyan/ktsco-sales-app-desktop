import {
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Customer } from "../../services/customer";
import { Product } from "../../services/product";
import { SaleBillRequest } from "../../services/sales-bill";
import IconBtn from "../shared/buttons/IconBtn";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import SubmitButton from "../shared/buttons/SubmitButton";
interface Props {
  customers: Customer[];
  products: Product[];
  onFormSubmit: (request: SaleBillRequest) => void;
  onFormReset: () => void;
}
const SalesBillForm = ({
  customers,
  products,
  onFormSubmit,
  onFormReset,
}: Props) => {
  const initialValues = {
    billNumber: 0,
    billDate: "",
    customerId: 0,
    billDetails: [
      {
        productId: 0,
        quantity: 0,
        unitPrice: 0,
        lineTotal: 0,
      },
    ],
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onFormSubmit(values)}
    >
      {({ values, resetForm }) => (
        <Form style={{ width: "100%" }}>
          <SimpleGrid columns={3} gap={10}>
            <FormControl isRequired>
              <FormLabel htmlFor="billDate">تاریخ ثبت</FormLabel>
              <Field
                as={Input}
                id="billDate"
                name="billDate"
                autoComplete="false"
                placeholder="yyyy-mm-dd"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="customerId">نام مشتری</FormLabel>
              <Field
                as={Select}
                id="customerId"
                name="customerId"
                autoComplete="false"
              >
                <option>انتخاب کنید</option>
                {customers.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerId + " - " + customer.customerName}
                  </option>
                ))}
              </Field>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="billNumber">شماره بل</FormLabel>
              <Field
                as={Input}
                id="billNumber"
                name="billNumber"
                autoComplete="false"
              />
            </FormControl>
          </SimpleGrid>
          <Divider mt={4} mb={4} borderWidth="4px" rounded="5px" />
          <FieldArray name="billDetails">
            {({ push, remove }) =>
              values.billDetails.map((detail, index) => (
                <Flex key={index} gap={3} dir="row" alignItems="end" mb={3}>
                  <FormControl isRequired>
                    <FormLabel htmlFor={`billDetails.${index}.productId`}>
                      نوع جنس
                    </FormLabel>
                    <Field
                      as={Select}
                      id={`billDetails.${index}.productId`}
                      name={`billDetails.${index}.productId`}
                      autoComplete="false"
                    >
                      <option>محصول را انتخاب کنید</option>
                      {products.map((product) => (
                        <option
                          key={product.productId}
                          value={product.productId}
                        >
                          {product.productId +
                            " - " +
                            product.productName +
                            " -  " +
                            product.unit}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor={`billDetails.${index}.quantity`}>
                      تعداد
                    </FormLabel>
                    <Field
                      as={Input}
                      id={`billDetails.${index}.quantity`}
                      name={`billDetails.${index}.quantity`}
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor={`billDetails.${index}.unitPrice`}>
                      قیمت
                    </FormLabel>
                    <Field
                      as={Input}
                      id={`billDetails.${index}.unitPrice`}
                      name={`billDetails.${index}.unitPrice`}
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormControl isRequired isReadOnly>
                    <FormLabel htmlFor={`billDetails.${index}.lineTotal`}>
                      مجموع
                    </FormLabel>
                    <Field
                      as={Input}
                      id={`billDetails.${index}.lineTotal`}
                      name={`billDetails.${index}.lineTotal`}
                      autoComplete="false"
                      value={detail.unitPrice * detail.quantity}
                    />
                  </FormControl>
                  <IconBtn
                    aria-label="add-icon"
                    icon="add"
                    onClick={() =>
                      push({
                        description: "",
                        quantity: 0,
                        unitPrice: 0,
                        lineTotal: 0,
                      })
                    }
                  />
                  <IconBtn
                    aria-label="add-icon"
                    icon="delete"
                    color="warning"
                    onClick={() => remove(index)}
                  />
                </Flex>
              ))
            }
          </FieldArray>
          <Center gap={10} mt={4}>
            <SubmitButton>ثبت بل فروش</SubmitButton>
            <SecondaryButton
              onClick={() => {
                resetForm();
                onFormReset();
              }}
            >
              فرم جدید
            </SecondaryButton>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default SalesBillForm;
