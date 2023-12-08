import useAllProviders from "../../hooks/expense/useAllProviders";
import { ExpenseFilter } from "../../services/expense";
import CommonForm, { FormData } from "../shared/CommonForm";
interface Props {
  onExpenseFilter: (values: ExpenseFilter) => void;
  onFilterReset: () => void;
}
const ExpenseFilterForm = ({ onExpenseFilter, onFilterReset }: Props) => {
  const { data: providers } = useAllProviders();
  const initialValues: ExpenseFilter = {
    provider: "",
    startDate: "",
    endDate: "",
  };
  const filterFormField: FormData = {
    initialValues: initialValues,
    submitButtonText: "فیلتر",
    resetButtonText: "انصراف",
    fields: [
      {
        type: "select",
        label: "مشتری",
        options: providers?.map((each) => ({
          value: each,
          text: each,
        })),
        name: "provider",
        placeholder: "فروشنده را انتخاب کنید",
      },
      {
        type: "input",
        label: "شروع از تاریخ",
        name: "startDate",
        placeholder: "yyyy-MM-dd",
      },
      {
        type: "input",
        label: "ختم تا تاریخ",
        name: "endDate",
        placeholder: "yyyy-MM-dd",
      },
    ],
  };
  return (
    <CommonForm
      formData={filterFormField}
      onSubmit={(values) => onExpenseFilter(values)}
      onFormReset={() => onFilterReset()}
    />
  );
};

export default ExpenseFilterForm;
