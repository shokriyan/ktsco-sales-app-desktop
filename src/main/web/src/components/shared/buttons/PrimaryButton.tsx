import ButtonSchema from "./ButtonSchema";
interface Props {
  isDisabled?: boolean;
  children: string;
  onClick: () => void;
}
const PrimaryButton = ({ isDisabled = false, children, onClick }: Props) => {
  return (
    <ButtonSchema isDisabled={isDisabled} onClick={onClick} color="primary">
      {children}
    </ButtonSchema>
  );
};

export default PrimaryButton;
