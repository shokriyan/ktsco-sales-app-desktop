package ktsco.app.repository;

import java.time.LocalDate;
import java.util.List;
import ktsco.app.entities.Expense;
import ktsco.app.models.expense.IExpenseSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

  @Query(
      value =
          "SELECT PROVIDER as provider, EXPENSE_DATE as expenseDate , SUM(LINE_TOTAL) as expenseTotal FROM EXPENSE GROUP BY PROVIDER, EXPENSE_DATE order by EXPENSE_DATE desc",
      nativeQuery = true)
  List<IExpenseSummary> getAllExpenseSummary();

  @Query(value = "Select provider from expense group by provider", nativeQuery = true)
  List<String> getProviders();

  List<Expense> getExpenseByProviderAndExpenseDate(String provider, LocalDate date);
}
