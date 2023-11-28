import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { RiShutDownLine } from "react-icons/ri";
import LoadSpinner from "../shared/LoadSpinner";
import useCustomToast from "../../hooks/useCustomToast";
import ShutdownService from "../../services/shutdown-service";

const ShutDownButton = () => {
  const [isShutDown, setShutDown] = useState(false);
  const toast = useCustomToast("هشدار");
  const shutdownService = ShutdownService((message) => {
    toast({
      description: message,
      status: "info",
      duration: 60000,
    });
  });
  const handleShotDown = () => {
    setShutDown(true);
    shutdownService.mutate();
    setTimeout(() => {}, 5000);
  };
  if (isShutDown) return <LoadSpinner />;
  return (
    <IconButton
      aria-label="shutdown"
      icon={<RiShutDownLine fontSize="18px" />}
      colorScheme="red"
      onClick={() => handleShotDown()}
    />
  );
};

export default ShutDownButton;
