import ButtonSchema from "./ButtonSchema";
interface Props {
  isDisabled?: boolean;
  children: string;
  onClick: () => void;
}
const WarningButton = ({ isDisabled = false, children, onClick }: Props) => {
  return (
    <ButtonSchema isDisabled={isDisabled} onClick={onClick} color="warning">
      {children}
    </ButtonSchema>
  );
};

export default WarningButton;
