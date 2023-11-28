import { IconButton } from "@chakra-ui/react";
import { ColorMap } from "../../../services/color-map";
import { IconMap } from "../../../services/icon-map";

interface Props {
  icon: "add" | "delete" | "detail";
  color?: "primary" | "warning" | "secondary";
  onClick: () => void;
  isRounded?: boolean;
}

const IconBtn = ({
  icon,
  color = "primary",
  isRounded = false,
  onClick,
}: Props) => {
  const btnIcon = IconMap(icon);
  return (
    <IconButton
      isRound={isRounded}
      onClick={() => onClick()}
      aria-label="icon-button"
      colorScheme={ColorMap(color)}
      as={btnIcon}
      size="sm"
    />
  );
};

export default IconBtn;
