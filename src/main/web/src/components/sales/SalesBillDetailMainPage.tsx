import { VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import FlexBox from "../shared/FlexBox";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import SaleBillDetail from "./SaleBillDetail";

const SalesBillDetailMainPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const billNumber = params.id || "";

  return (
    <FlexBox title="بل فروش">
      <VStack alignItems="flex-end" width="100%" spacing={10}>
        <SaleBillDetail billNumber={billNumber} />
        <SecondaryButton onClick={() => navigate("/sales")}>
          برگشت به صفحه قبل
        </SecondaryButton>
      </VStack>
    </FlexBox>
  );
};

export default SalesBillDetailMainPage;
