import { Divider, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBillDetail from "../../hooks/bill/useBillDetail";
import { BillHead } from "../../services/sales-bill";
import Banner from "../shared/Banner";
import FlexBox from "../shared/FlexBox";
import LoadSpinner from "../shared/LoadSpinner";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import BillDetailHead from "./BillDetailHead";
import BillDetailTable from "./BillDetailTable";

const SalesBillDetailMainPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const billNumber = params.id;
  const { data, isLoading, isError } = useBillDetail(billNumber);
  const [billHeader, setBillHeader] = useState<BillHead>();
  useEffect(() => {
    if (data) {
      const head: BillHead = {
        billNumber: data[0].billNumber,
        customer: data[0].customer,
        billDate: data[0].billDate,
        billTotal: data.reduce((sum, current) => sum + current.lineTotal, 0),
      };
      setBillHeader(head);
    }
  }, [data]);
  if (isLoading) return <LoadSpinner />;
  if (!data || isError)
    return <Banner type="error">خطا در سیستم دوباره تلاش کنید</Banner>;
  return (
    <FlexBox title="بل فروش">
      <VStack width="100%" align="flex-start">
        {billHeader && <BillDetailHead billHead={billHeader} />}
        <Divider borderWidth={4} mt={4} mb={4} />
        <BillDetailTable bills={data} />
      </VStack>
      <VStack alignItems="flex-end" width="100%">
        <SecondaryButton onClick={() => navigate("/sales")}>
          برگشت به صفحه قبل
        </SecondaryButton>
      </VStack>
    </FlexBox>
  );
};

export default SalesBillDetailMainPage;
