package ktsco.app.models.stock;

import java.math.BigDecimal;
import ktsco.app.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class StockSaveResponse {
  private long stockId;
  private Product product;
  private String inDate;

  private BigDecimal quantityIn;
}
