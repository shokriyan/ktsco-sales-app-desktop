import { HStack, Heading, Image, Spacer, VStack } from "@chakra-ui/react";
import ktscoLogo from "../../assets/ktsco.png";
import LinkButton from "../shared/buttons/LinkButton";
import ShutDownButton from "./ShutDownButton";

const Header = () => {
  return (
    <VStack width="100%" align="start" backgroundColor="gray.500">
      <HStack justify="space-between" width="100%" padding={4} spacing={5}>
        <Heading size="lg" color="darkblue">
          خراسان تک سیم
        </Heading>
        <Heading>دیتابیس ثبت فروشات</Heading>
        <Image src={ktscoLogo} boxSize={16} />
      </HStack>
      <HStack
        backgroundColor="gray.400"
        width="100%"
        spacing={2}
        pl={4}
        pr={4}
        className="hide-print"
      >
        <LinkButton link="/customers" text="مشتریان" />
        <LinkButton link="/products" text="محصولات" />
        <LinkButton link="/" text="بل فروشات" />
        <LinkButton link="/receipts" text="رسید فروشات" />
        <LinkButton link="/expense" text="بل خریداری" />
        <LinkButton link="/sales" text="گزارش فروشات" />
        <LinkButton link="/expense-report" text="گزارش خریداری" />
        <LinkButton link="/stock" text="انبار" />
        <Spacer />
        <ShutDownButton />
      </HStack>
    </VStack>
  );
};

export default Header;
