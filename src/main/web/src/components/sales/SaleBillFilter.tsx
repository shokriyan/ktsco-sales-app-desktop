import useGetAllCustomers from "../../hooks/customers/useGetAllCustomers";
import Banner from "../shared/Banner";
import CommonForm, { FormData } from "../shared/CommonForm";
import LoadSpinner from "../shared/LoadSpinner";
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
  if (isLoading) return <LoadSpinner />;
  if (!customers || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  const initialValues: BillFilter = {
    customerId: 0,
    startDate: "",
    endDate: "",
  };
  const filterFormData: FormData = {
    initialValues: initialValues,
    submitButtonText: "فیلتر",
    resetButtonText: "انصراف",
    fields: [
      {
        type: "select",
        name: "customerId",
        label: "نام مشتری",
        placeholder: "نام مشتری را انتخاب کنید",
        options: customers.map((each) => ({
          value: each.customerId,
          text: each.customerName,
        })),
      },
      {
        type: "input",
        name: "startDate",
        label: "شروع از تاریخ",
        placeholder: "yyyy-MM-dd",
      },
      {
        type: "input",
        name: "endDate",
        label: "ختم تا تاریخ",
        placeholder: "yyyy-MM-dd",
      },
    ],
  };
  const handleFilterSubmit = (values: BillFilter) => {
    onFilterSelect(values);
  };

  return (
    <CommonForm
      formData={filterFormData}
      onSubmit={(values) => handleFilterSubmit(values)}
      onFormReset={() => onFilterReset()}
    />
  );
};

export default SaleBillFilter;
