import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useBillSummary from "../../hooks/bill/useBillSummary";
import Banner from "../shared/Banner";
import FlexBox from "../shared/FlexBox";
import LoadSpinner from "../shared/LoadSpinner";
import SaleBillFilter, { BillFilter } from "./SaleBillFilter";
import SalesBillsTable from "./SalesBillsTable";

const SalesMainPage = () => {
  const [billFilter, setBillFilter] = useState<BillFilter>();
  const {
    data: summary,
    isLoading,
    isError,
    refetch,
  } = useBillSummary(billFilter);
  useEffect(() => {
    refetch();
  }, [billFilter]);

  if (isLoading) return <LoadSpinner />;
  if (!summary || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return (
    <FlexBox title="گزارش فروشات">
      <VStack width="100%" align="flex-start">
        <SaleBillFilter
          onFilterSelect={(filter) => {
            setBillFilter(filter);
          }}
          onFilterReset={() => {
            setBillFilter(undefined);
          }}
        />
        <SalesBillsTable summary={summary} />
      </VStack>
    </FlexBox>
  );
};

export default SalesMainPage;
