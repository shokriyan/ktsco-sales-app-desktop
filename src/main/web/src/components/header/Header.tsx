import { HStack, Heading, Image, VStack } from "@chakra-ui/react";
import ktscoLogo from "../../assets/ktsco.png";
import LinkButton from "../shared/buttons/LinkButton";

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
      <HStack backgroundColor="gray.400" width="100%" spacing={2}>
        <LinkButton link="/customers" text="مشتریان" />
        <LinkButton link="/products" text="محصولات" />
        <LinkButton link="/bills" text="بل فروشات" />
        <LinkButton link="/sales" text="فروشات" />
        <LinkButton link="/stock" text="انبار" />
      </HStack>
    </VStack>
  );
};

export default Header;
