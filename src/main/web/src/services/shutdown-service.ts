import { useMutation } from "react-query";
import ApiClient from "./api-client";
interface Shutdown {
  message: string;
}

const ShutdownService = (onShutdownSuccess: (message: string) => void) => {
  const apliClient = new ApiClient<Shutdown>("/actuator/shutdown");
  return useMutation<Shutdown>({
    mutationFn: apliClient.post,
    onSuccess: (response) => onShutdownSuccess(response.message),
  });
};

export default ShutdownService;
