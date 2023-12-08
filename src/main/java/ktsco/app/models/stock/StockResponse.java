package ktsco.app.models.stock;

import java.math.BigDecimal;
import ktsco.app.entities.Product;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class StockResponse {
  private Product product;
  private BigDecimal quantityIn;
  private BigDecimal quantityOut;
  private BigDecimal stockRemained;
}
