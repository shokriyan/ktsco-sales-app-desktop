import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface Props {
  children: string;
  type: "error" | "info" | "warning" | "success" | "loading";
}

const Banner = ({ children, type = "success" }: Props) => {
  const errorMap: { [key: string]: string } = {
    error: "خطا",
    info: "اطلاعات",
    warning: "اخطار",
    success: "تایید",
    loading: "بارگزاری",
  };
  return (
    <Alert
      status={type}
      margin={2}
      borderRadius="5px"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      variant="top-accent"
      className={`banner-${type}`}
    >
      <AlertIcon />
      <AlertTitle>{errorMap[type]}</AlertTitle>
      {children}
    </Alert>
  );
};

export default Banner;
