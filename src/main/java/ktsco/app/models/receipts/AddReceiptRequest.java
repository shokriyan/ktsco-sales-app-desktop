package ktsco.app.models.receipts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import ktsco.app.entities.Receipts;
import ktsco.app.utilities.DateUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddReceiptRequest {
  private long customerId;
  private long billNumber;
  private String receiptDate;
  private String description;
  private BigDecimal receiptAmount;

  @JsonIgnore
  public Receipts getReceipt() {
    Receipts receipts = new Receipts();
    receipts.setBillNumber(billNumber);
    receipts.setReceiptDate(DateUtils.toLocalDate(receiptDate));
    receipts.setDescription(description);
    receipts.setReceiptAmount(receiptAmount);
    receipts.setCustomerId(customerId);
    return receipts;
  }
}
