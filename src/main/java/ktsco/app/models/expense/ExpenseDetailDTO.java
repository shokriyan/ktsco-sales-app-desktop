package ktsco.app.models.expense;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExpenseDetailDTO {
  private String description;
  private String unit;
  private BigDecimal quantity;
  private BigDecimal unitPrice;
  private BigDecimal lineTotal;
}
