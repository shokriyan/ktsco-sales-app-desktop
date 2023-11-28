import { Button } from "@chakra-ui/react";
interface Props {
  children: string;
  isDisabled?: true | false;
}
const SubmitButton = ({ isDisabled = false, children }: Props) => {
  return (
    <Button
      colorScheme="blue"
      type="submit"
      isDisabled={isDisabled}
      minWidth="120px"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
