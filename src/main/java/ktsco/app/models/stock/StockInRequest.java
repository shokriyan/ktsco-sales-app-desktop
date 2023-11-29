package ktsco.app.models.stock;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StockInRequest {
  private long productId;
  private String inDate;
  private BigDecimal quantityIn;
}
