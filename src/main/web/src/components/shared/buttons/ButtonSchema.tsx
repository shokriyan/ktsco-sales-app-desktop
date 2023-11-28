import { Button } from "@chakra-ui/react";
import { ColorMap } from "../../../services/color-map";

interface Props {
  isDisabled?: boolean;
  children: string;
  color: "primary" | "warning" | "secondary";
  type?: "submit" | "button" | "reset";
  onClick: () => void;
}
const ButtonSchema = ({
  isDisabled,
  children,
  color = "primary",
  type = "button",
  onClick,
}: Props) => {
  return (
    <Button
      type={type}
      colorScheme={ColorMap(color)}
      onClick={onClick}
      isDisabled={isDisabled}
      minWidth="120px"
    >
      {children}
    </Button>
  );
};

export default ButtonSchema;
