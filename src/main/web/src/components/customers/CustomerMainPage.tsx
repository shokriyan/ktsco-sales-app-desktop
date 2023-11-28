import { VStack } from "@chakra-ui/react";
import useGetAllCustomers from "../../hooks/customers/useGetAllCustomers";
import FlexBox from "../shared/FlexBox";
import CustomerEntryForm from "./CustomerEntryForm";
import CustomersTable from "./CustomersTable";
import { useEffect, useState } from "react";
import { Customer } from "../../services/customer";

const CustomerMainPage = () => {
  const { data, isError, isLoading, refetch } = useGetAllCustomers();
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    if ((!isError || !isLoading) && data) {
      setCustomers(data);
    }
  }, [data]);
  return (
    <FlexBox title="بخش مشتریان">
      <VStack width="100%" align="flex-start" spacing={10}>
        <CustomerEntryForm
          onAddSuccess={() => {
            refetch();
          }}
        />
        <CustomersTable
          customers={customers}
          onDeleteSuccess={(id) => {
            console.log("delete success" + id);

            setCustomers(customers.filter((each) => each.customerId != id));
          }}
        />
      </VStack>
    </FlexBox>
  );
};

export default CustomerMainPage;
