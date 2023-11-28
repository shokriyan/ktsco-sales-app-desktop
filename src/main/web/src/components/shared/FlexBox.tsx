import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  title: string;
  children: ReactNode;
  width?: string;
  align?: "center" | "flex-start";
}
const FlexBox = ({
  title,
  children,
  width = "100%",
  align = "flex-start",
}: Props) => {
  return (
    <>
      <Flex align="center" justify="center" width="100%">
        <Box
          width={width}
          boxShadow="dark-lg"
          rounded="md"
          bg={"gray.600"}
          p={4}
        >
          <VStack width="100%" alignItems={align} spacing={6}>
            <Heading size="lg">{title}</Heading>
            {children}
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default FlexBox;
