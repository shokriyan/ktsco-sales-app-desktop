package ktsco.app.models.bill;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillDetailRequest {
  private long productId;
  private BigDecimal quantity;
  private BigDecimal unitPrice;
  private BigDecimal lineTotal;
}
