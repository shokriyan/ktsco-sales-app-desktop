package ktsco.app.models.expense;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ExpenseResponse {
  private String expenseDate;
  private String provider;
  private List<ExpenseDetailDTO> expenseDetails;

  public BigDecimal getBillTotal() {
    return expenseDetails.stream()
        .map(ExpenseDetailDTO::getLineTotal)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}
