import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface Props {
  link: string;
  text: string;
}
const LinkButton = ({ link, text }: Props) => {
  return (
    <Button
      rightIcon={<ExternalLinkIcon />}
      as={Link}
      width="150px"
      borderRadius={5}
      to={link}
      color="darkblue"
    >
      {text}
    </Button>
  );
};

export default LinkButton;
