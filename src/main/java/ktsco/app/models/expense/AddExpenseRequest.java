package ktsco.app.models.expense;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.List;
import ktsco.app.utilities.DateUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddExpenseRequest {
  private String expenseDate;
  private String provider;
  private List<ExpenseDetailDTO> expenseDetails;

  @JsonIgnore
  public LocalDate getExpenseLocalData() {
    return DateUtils.toLocalDate(expenseDate);
  }
}
