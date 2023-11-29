package ktsco.app.services;

import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Expense;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.expense.AddExpenseRequest;
import ktsco.app.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final ExpenseRepository expenseRepository;

  public void saveExpense(Expense expense) {
    expenseRepository.save(expense);
  }

  public void saveExpense(AddExpenseRequest request) {
    try {
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
                expense.setLineTotal(each.getLineTotal());
                saveExpense(expense);
              });
    } catch (Exception ex) {
      throw new ErrorResponseException(HttpStatus.INTERNAL_SERVER_ERROR, CodeMap.E101);
    }
  }
}
