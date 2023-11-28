import { useDisclosure } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { Customer } from "../../services/customer";
import { CustomTable } from "../shared/CustomTable";
import IconBtn from "../shared/buttons/IconBtn";
import DeleteCustomer from "./DeleteCustomer";

interface Props {
  customers: Customer[];
  onDeleteSuccess: (id: number) => void;
}

const CustomersTable = ({ customers, onDeleteSuccess }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const columnHelper = createColumnHelper<Customer>();
  const columns = [
    columnHelper.display({
      id: "deleteIcon",
      header: "حدف",
      cell: (info) => (
        <IconBtn
          icon="delete"
          color="warning"
          onClick={() => {
            setSelectedCustomer(info.row.original);
            onOpen();
          }}
        />
      ),
    }),
    columnHelper.accessor("customerId", {
      cell: (info) => info.getValue(),
      header: "کد مشتری",
    }),
    columnHelper.accessor("customerName", {
      cell: (info) => info.getValue(),
      header: "نام مشتری",
    }),
  ];
  return (
    <>
      {selectedCustomer && (
        <DeleteCustomer
          customer={selectedCustomer}
          isOpen={isOpen}
          onClose={onClose}
          onDeleteSuccess={(id) => onDeleteSuccess(id)}
        />
      )}
      <CustomTable columns={columns} data={customers} haveFilter />
    </>
  );
};

export default CustomersTable;
