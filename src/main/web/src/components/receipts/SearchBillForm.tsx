import CommonForm, { FormData } from "../shared/CommonForm";

interface Props {
  onSearchSubmit: (billNumber: string) => void;
  onSearchCancel: () => void;
}

const SearchBillForm = ({ onSearchSubmit, onSearchCancel }: Props) => {
  const initialValues = {
    billNumber: "",
  };
  const formData: FormData = {
    submitButtonText: "جستجو",
    resetButtonText: "فرم جدید",
    initialValues: initialValues,
    fields: [
      {
        type: "input",
        name: "billNumber",
        placeholder: "شماره بل فروش را وارد کنید",
        label: "شماره بل فروش",
        isRequired: true,
      },
    ],
  };
  return (
    <CommonForm
      formData={formData}
      onSubmit={(values) => {
        onSearchSubmit(values.billNumber);
      }}
      onFormReset={() => onSearchCancel()}
    />
  );
};

export default SearchBillForm;
