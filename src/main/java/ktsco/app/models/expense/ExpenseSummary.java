package ktsco.app.models.expense;

import java.math.BigDecimal;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ExpenseSummary {
  private String provider;
  private String expenseDate;
  private BigDecimal expenseTotal;
}
