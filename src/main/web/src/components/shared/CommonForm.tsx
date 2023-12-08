import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import SecondaryButton from "./buttons/SecondaryButton";
import SubmitButton from "./buttons/SubmitButton";

export interface SelectOption {
  value: any;
  text: any;
}

export interface FormField {
  type: "input" | "select";
  label: string;
  name: string;
  isRequired?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  isTotal?: boolean;
  calculate?: (first: number, second: number) => string | undefined;
}

export interface FormData {
  fields: FormField[];
  initialValues: any;
  submitButtonText: string;
  resetButtonText: string;
}

interface Props {
  formData: FormData;
  direction?: "row" | "column";
  onSubmit: (values: any) => void;
  onFormReset?: () => void;
}

const CommonForm = ({
  formData,
  direction = "row",
  onSubmit,
  onFormReset,
}: Props) => {
  const handleSubmit = (values: any) => {
    onSubmit(values);
  };
  return (
    <Formik initialValues={formData.initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, resetForm, errors }) => (
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack flex="column" width="100%" gap={4} alignItems="flex-start">
            <Flex
              width="100%"
              gap={4}
              flexDirection={direction}
              alignItems={direction === "row" ? "end" : "center"}
            >
              <Flex width="100%" gap={4}>
                {formData.fields.map((field, index) => (
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
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default CommonForm;
