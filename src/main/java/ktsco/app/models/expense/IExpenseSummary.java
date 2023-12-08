package ktsco.app.models.expense;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface IExpenseSummary {

  String getProvider();

  LocalDate getExpenseDate();

  BigDecimal getExpenseTotal();
}
