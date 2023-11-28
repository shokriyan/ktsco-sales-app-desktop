import { useToast } from "@chakra-ui/react";

const useCustomToast = (title: string) => {
  const toast = useToast({
    duration: 3000,
    isClosable: false,
    position: "top",
    title: title,
  });
  return toast;
};

export default useCustomToast;
