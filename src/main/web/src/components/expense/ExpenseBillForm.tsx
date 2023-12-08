import { AddExpenseRequest } from "../../services/expense";
import { CommonFormArray, FormArrayData } from "../shared/CommonFormArray";

interface Props {
  onExpenseSubmit: (values: AddExpenseRequest) => void;
  onFormReset: () => void;
}

const ExpenseBillForm = ({ onExpenseSubmit, onFormReset }: Props) => {
  const initialValues: AddExpenseRequest = {
    expenseDate: "",
    provider: "",
    expenseDetails: [
      {
        description: "",
        unit: "",
        quantity: 0,
        unitPrice: 0,
        lineTotal: 0,
      },
    ],
  };
  const formArrayFields: FormArrayData = {
    headerFields: [
      {
        type: "input",
        name: "provider",
        label: "فروشنده",
        isRequired: true,
      },
      {
        type: "input",
        name: "expenseDate",
        label: "تاریخ خریداری",
        isRequired: true,
        placeholder: "yyyy-MM-dd",
      },
    ],
    arrayFields: [
      {
        type: "input",
        name: "description",
        label: "نوع جنس / توضیحات",
        isRequired: true,
      },
      {
        type: "input",
        name: "unit",
        label: "واحد شمارش",
        isRequired: true,
      },
      {
        type: "input",
        name: "quantity",
        label: "تعداد",
        isRequired: true,
      },
      {
        type: "input",
        name: "unitPrice",
        label: "قیمت",
        isRequired: true,
      },
      {
        type: "input",
        name: "lineTotal",
        label: "مجموع",
        isTotal: true,
      },
    ],
    submitButtonText: "ثبت خریداری",
    resetButtonText: "فرم جدید",
    initialValues: initialValues,
    arrayFieldName: "expenseDetails",
  };
  return (
    <CommonFormArray
      formData={formArrayFields}
      onSubmit={(values) => onExpenseSubmit(values)}
      onFormReset={() => onFormReset()}
    />
  );
};

export default ExpenseBillForm;
