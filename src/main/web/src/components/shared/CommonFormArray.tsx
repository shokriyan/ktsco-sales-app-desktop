import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Formik } from "formik";
import { Form } from "react-router-dom";
import { currency } from "../../hooks/number-format";
import { FormField } from "./CommonForm";
import IconBtn from "./buttons/IconBtn";
import SecondaryButton from "./buttons/SecondaryButton";
import SubmitButton from "./buttons/SubmitButton";

export interface FormArrayData {
  headerFields: FormField[];
  arrayFields: FormField[];
  arrayFieldName: string;
  initialValues: any;
  submitButtonText: string;
  resetButtonText: string;
}

interface Props {
  formData: FormArrayData;
  direction?: "row" | "column";
  onSubmit: (values: any) => void;
  onFormReset?: () => void;
}
export function CommonFormArray({
  formData,
  direction = "row",
  onSubmit,
  onFormReset,
}: Props) {
  const handleSubmit = (values: any) => {
    onSubmit(values);
  };
  return (
    <Formik initialValues={formData.initialValues} onSubmit={handleSubmit}>
      {({ values, handleSubmit, resetForm, errors }) => (
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack flex="column" width="100%" gap={4} alignItems="center">
            <Flex
              width="100%"
              gap={4}
              flexDirection={direction}
              alignItems={direction === "row" ? "end" : "center"}
            >
              {formData.headerFields.map((field, index) => (
                <FormControl
                  key={index}
                  isRequired={field.isRequired}
                  isInvalid={!!errors[field.name]}
                >
                  <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                  <Field
                    as={field.type === "input" ? Input : Select}
                    name={field.name}
                    id={field.name}
                    autoComplete="false"
                    placeholder={field.placeholder}
                  >
                    {field.options
                      ? field.options.map((each, index) => (
                          <option key={index} value={each.value}>
                            {each.text}
                          </option>
                        ))
                      : null}
                  </Field>
                </FormControl>
              ))}
            </Flex>
            <Divider mt={4} mb={4} borderWidth="4px" rounded="5px" />
            <FieldArray name={formData.arrayFieldName}>
              {({ push, remove }) =>
                values[formData.arrayFieldName].map(
                  (each: any, rowIndex: number) => (
                    <Flex
                      width="100%"
                      gap={4}
                      flexDirection={direction}
                      alignItems={direction === "row" ? "end" : "center"}
                      key={rowIndex}
                    >
                      {formData.arrayFields.map((field, index) => (
                        <FormControl
                          key={index}
                          isRequired={field.isRequired}
                          isInvalid={!!errors[field.name]}
                        >
                          <FormLabel
                            htmlFor={`${formData.arrayFieldName}.${rowIndex}.${field.name}`}
                          >
                            {field.label}
                          </FormLabel>
                          {!field.isTotal ? (
                            <Field
                              as={field.type === "input" ? Input : Select}
                              name={`${formData.arrayFieldName}.${rowIndex}.${field.name}`}
                              id={`${formData.arrayFieldName}.${rowIndex}.${field.name}`}
                              autoComplete="false"
                              placeholder={`${field.placeholder}`}
                            >
                              {field.options
                                ? field.options.map((each, index) => (
                                    <option key={index} value={each.value}>
                                      {each.text}
                                    </option>
                                  ))
                                : null}
                            </Field>
                          ) : (
                            <Field
                              as={field.type === "input" ? Input : Select}
                              name={`${formData.arrayFieldName}.${rowIndex}.${field.name}`}
                              id={`${formData.arrayFieldName}.${rowIndex}.${field.name}`}
                              autoComplete="false"
                              value={currency(each.quantity * each.unitPrice)}
                              placeholder={`${field.placeholder}`}
                            />
                          )}
                        </FormControl>
                      ))}
                      <IconBtn
                        aria-label="add-icon"
                        icon="add"
                        onClick={() => {
                          push({
                            description: "",
                            quantity: 0,
                            unitPrice: 0,
                            lineTotal: 0,
                          });
                        }}
                      />
                      <IconBtn
                        aria-label="add-icon"
                        icon="remove"
                        color="warning"
                        onClick={() => remove(rowIndex)}
                      />
                    </Flex>
                  )
                )
              }
            </FieldArray>
            <Flex minWidth="max-content" gap={4} alignItems="center">
              <SubmitButton>{formData.submitButtonText}</SubmitButton>
              <SecondaryButton
                onClick={() => {
                  resetForm();
                  if (onFormReset) {
                    onFormReset();
                  }
                }}
              >
                {formData.resetButtonText}
              </SecondaryButton>
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
