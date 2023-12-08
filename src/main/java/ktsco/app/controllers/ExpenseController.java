package ktsco.app.controllers;

import java.util.List;
import ktsco.app.codes.CodeMap;
import ktsco.app.models.expense.AddExpenseRequest;
import ktsco.app.models.expense.ExpenseResponse;
import ktsco.app.models.expense.ExpenseSummary;
import ktsco.app.models.general.ApiResponse;
import ktsco.app.models.general.Summary;
import ktsco.app.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor
@CrossOrigin
public class ExpenseController {
  private final ExpenseService expenseService;

  @PostMapping("/save")
  public ResponseEntity<ApiResponse> saveExpense(@RequestBody AddExpenseRequest request) {
    expenseService.saveExpense(request);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.E100.name()).build(), HttpStatus.CREATED);
  }

  @GetMapping("/providers")
  public ResponseEntity<List<String>> getProviders() {
    return new ResponseEntity<>(expenseService.getProviders(), HttpStatus.OK);
  }

  @GetMapping("/summary")
  public ResponseEntity<Summary<ExpenseSummary>> getExpenseSummary(
      @RequestParam(value = "provider", required = false) String provider,
      @RequestParam(value = "startDate", required = false) String startDate,
      @RequestParam(value = "endDate", required = false) String endDate) {
    return new ResponseEntity<>(
        expenseService.getExpenseSummary(provider, startDate, endDate), HttpStatus.OK);
  }

  @GetMapping("/detail")
  public ResponseEntity<ExpenseResponse> getExpenseDetailResponse(
      @RequestParam("provider") String provider, @RequestParam("expenseDate") String date) {
    return new ResponseEntity<>(expenseService.getExpenseDetail(provider, date), HttpStatus.OK);
  }
}
