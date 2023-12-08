package ktsco.app.models.bill;

import java.math.BigDecimal;
import ktsco.app.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SaleBillDetailResponse {
  private long billId;
  private Product product;
  private BigDecimal quantity;
  private BigDecimal unitPrice;
  private BigDecimal lineTotal;
}
