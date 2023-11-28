import ButtonSchema from "./ButtonSchema";
interface Props {
  isDisabled?: boolean;
  children: string;
  onClick: () => void;
}
const SecondaryButton = ({ isDisabled = false, children, onClick }: Props) => {
  return (
    <ButtonSchema isDisabled={isDisabled} onClick={onClick} color="secondary">
      {children}
    </ButtonSchema>
  );
};

export default SecondaryButton;
