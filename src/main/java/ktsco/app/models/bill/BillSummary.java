package ktsco.app.models.bill;

import java.math.BigDecimal;
import ktsco.app.entities.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillSummary {
  private long billNumber;
  private Customer customer;
  private String billDate;
  private BigDecimal billTotal;
  private BigDecimal receivedTotal;
  private boolean receivedInFull;
}
