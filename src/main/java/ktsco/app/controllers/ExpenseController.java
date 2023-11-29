package ktsco.app.controllers;

import ktsco.app.codes.CodeMap;
import ktsco.app.models.expense.AddExpenseRequest;
import ktsco.app.models.general.ApiResponse;
import ktsco.app.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor
public class ExpenseController {
  private final ExpenseService expenseService;

  public ResponseEntity<ApiResponse> saveExpense(@RequestBody AddExpenseRequest request) {
    expenseService.saveExpense(request);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.E100.name()).build(), HttpStatus.CREATED);
  }
}
