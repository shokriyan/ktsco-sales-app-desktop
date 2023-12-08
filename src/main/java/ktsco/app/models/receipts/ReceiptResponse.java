package ktsco.app.models.receipts;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReceiptResponse {

  private long receiptId;
  private long billNumber;
  private String receiptDate;
  private String description;
  private BigDecimal receiptAmount;
}
