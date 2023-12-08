import { Customer } from "../../services/customer";
import { Product } from "../../services/product";
import { SaleBillRequest } from "../../services/sales-bill";
import { CommonFormArray, FormArrayData } from "../shared/CommonFormArray";
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
  const formArrayFields: FormArrayData = {
    headerFields: [
      {
        type: "select",
        name: "customerId",
        label: "نام مشتری",
        options: customers.map((customer) => ({
          value: customer.customerId,
          text: `${customer.customerId} - ${customer.customerName}`,
        })),
        placeholder: "نام مشتری را انتخاب کنید",
        isRequired: true,
      },
      {
        type: "input",
        name: "billNumber",
        label: "شماره بل",
        isRequired: true,
      },
      {
        type: "input",
        name: "billDate",
        label: "تاریخ بل",
        placeholder: "yyyy-MM-dd",
        isRequired: true,
      },
    ],
    arrayFields: [
      {
        type: "select",
        name: "productId",
        label: "نام محصول",
        placeholder: "انتخاب کنید",
        options: products.map((each) => ({
          value: each.productId,
          text: `${each.productId} - ${each.productName} - ${each.unit}`,
        })),
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
        isRequired: true,
      },
    ],
    submitButtonText: "ثبت بل فروش",
    resetButtonText: "فرم جدید",
    initialValues: initialValues,
    arrayFieldName: "billDetails",
  };
  return (
    <CommonFormArray
      formData={formArrayFields}
      onSubmit={(values) => onFormSubmit(values)}
      onFormReset={() => onFormReset()}
    />
  );
};

export default SalesBillForm;
