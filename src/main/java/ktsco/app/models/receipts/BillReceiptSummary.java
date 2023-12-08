package ktsco.app.models.receipts;

import java.util.List;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class BillReceiptSummary {
  private IReceiptSummary receiptSummary;
  private List<ReceiptResponse> receiptResponses;
}
