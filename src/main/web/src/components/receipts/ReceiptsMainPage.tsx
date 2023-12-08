import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import SaleBillDetail from "../sales/SaleBillDetail";
import FlexBox from "../shared/FlexBox";
import SearchBillForm from "./SearchBillForm";

const ReceiptsMainPage = () => {
  const [billNumber, setBillNumber] = useState("");
  return (
    <FlexBox title="رسید فروشات">
      <VStack width="100%" spacing={10}>
        <SearchBillForm
          onSearchSubmit={(billNumber) => {
            setBillNumber("");
            setBillNumber(billNumber);
          }}
          onSearchCancel={() => setBillNumber("")}
        />
        {billNumber && <SaleBillDetail billNumber={billNumber} />}
      </VStack>
    </FlexBox>
  );
};

export default ReceiptsMainPage;
