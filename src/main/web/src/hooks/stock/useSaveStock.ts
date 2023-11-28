import { useMutation } from "react-query";
import StockService, {
  StockInRequest,
  StockSaveResponse,
} from "../../services/stock";
import { AxiosError } from "axios";
import { ErrorResponse, codeMap } from "../../services/code-map";

const useSaveStock = (
  onSaveSuccess: (response: StockSaveResponse) => void,
  onSaveError: (message: string) => void
) => {
  const stockService = StockService<StockSaveResponse>("/save");
  return useMutation<
    StockSaveResponse,
    AxiosError<ErrorResponse>,
    StockInRequest
  >({
    mutationFn: stockService.post,
    onSuccess: (response) => onSaveSuccess(response),
    onError: (error) => onSaveError(codeMap(error.response?.data.errorCode)),
  });
};
export default useSaveStock;
