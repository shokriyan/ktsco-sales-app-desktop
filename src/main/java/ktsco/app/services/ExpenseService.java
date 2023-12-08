package ktsco.app.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Expense;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.expense.*;
import ktsco.app.models.general.Summary;
import ktsco.app.repository.ExpenseRepository;
import ktsco.app.utilities.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final ExpenseRepository expenseRepository;

  public void saveExpense(Expense expense) {
    expenseRepository.save(expense);
  }

  public void saveExpense(AddExpenseRequest request) {
    request
        .getExpenseDetails()
        .forEach(
            each -> {
              Expense expense = new Expense();
              expense.setExpenseDate(request.getExpenseLocalData());
              expense.setProvider(request.getProvider());
              expense.setDescription(each.getDescription());
              expense.setUnit(each.getUnit());
              expense.setQuantity(each.getQuantity());
              expense.setUnitPrice(each.getUnitPrice());
              expense.setLineTotal(each.getUnitPrice().multiply(each.getQuantity()));
              saveExpense(expense);
            });
  }

  public Summary<ExpenseSummary> getExpenseSummary(
      @Nullable String provider, @Nullable String startDate, @Nullable String endDate) {
    List<ExpenseSummary> expenseSummaries = new ArrayList<>();
    List<IExpenseSummary> filteredExpense;
    var expenses = expenseRepository.getAllExpenseSummary();
    if (StringUtils.hasText(provider)) {
      filteredExpense =
          expenses.stream()
              .filter(each -> each.getProvider().equals(provider))
              .collect(Collectors.toList());
    } else {
      filteredExpense = expenses;
    }

    LocalDate fromData;
    if (StringUtils.hasText(startDate)) {
      fromData = DateUtils.toLocalDate(startDate);
    } else {
      fromData = LocalDate.of(2000, 1, 1);
    }

    LocalDate toDate;
    if (StringUtils.hasText(endDate)) {
      toDate = DateUtils.toLocalDate(endDate);
    } else {
      toDate = LocalDate.of(2400, 12, 31);
    }
    var filtered =
        filteredExpense.stream()
            .filter(
                each ->
                    each.getExpenseDate().isAfter(fromData)
                        && each.getExpenseDate().isBefore(toDate))
            .collect(Collectors.toList());

    filtered.forEach(
        each -> {
          ExpenseSummary expenseSummary =
              new ExpenseSummary(
                  each.getProvider(),
                  DateUtils.toJalaliLocalDate(each.getExpenseDate()),
                  each.getExpenseTotal());
          expenseSummaries.add(expenseSummary);
        });

    Summary<ExpenseSummary> summary = new Summary<>();
    summary.setItems(expenseSummaries);
    summary.setTotalAmount(
        expenseSummaries.stream()
            .map(ExpenseSummary::getExpenseTotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add));
    return summary;
  }

  public List<String> getProviders() {
    return expenseRepository.getProviders();
  }

  public ExpenseResponse getExpenseDetail(String provider, String date) {
    var expenses =
        expenseRepository.getExpenseByProviderAndExpenseDate(provider, DateUtils.toLocalDate(date));
    if (expenses.isEmpty()) throw new ErrorResponseException(HttpStatus.NOT_FOUND, CodeMap.E102);
    List<ExpenseDetailDTO> expenseDetailList = new ArrayList<>();
    expenses.forEach(
        each -> {
          ExpenseDetailDTO detail =
              new ExpenseDetailDTO(
                  each.getDescription(),
                  each.getUnit(),
                  each.getQuantity(),
                  each.getUnitPrice(),
                  each.getLineTotal());
          expenseDetailList.add(detail);
        });
    return ExpenseResponse.builder()
        .expenseDate(date)
        .provider(provider)
        .expenseDetails(expenseDetailList)
        .build();
  }
}
