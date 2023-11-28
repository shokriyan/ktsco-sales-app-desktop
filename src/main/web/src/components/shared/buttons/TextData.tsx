import { Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  label: string;
  children?: ReactNode;
  direction?: "row" | "column";
}
const TextData = ({ label, children, direction = "column" }: Props) => {
  return (
    <Stack width="100%" direction={{ md: "row", lg: direction }} spacing={2}>
      <Text fontWeight="bold" textAlign="start">
        {label.toUpperCase()}
      </Text>
      <Text>{children}</Text>
    </Stack>
  );
};

export default TextData;
