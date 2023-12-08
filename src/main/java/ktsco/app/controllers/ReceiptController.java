package ktsco.app.controllers;

import ktsco.app.codes.CodeMap;
import ktsco.app.models.general.ApiResponse;
import ktsco.app.models.general.Summary;
import ktsco.app.models.receipts.AddReceiptRequest;
import ktsco.app.models.receipts.BillReceiptSummary;
import ktsco.app.models.receipts.IReceiptSummary;
import ktsco.app.services.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/receipt")
@CrossOrigin
public class ReceiptController {

  private final ReceiptService receiptService;

  @PostMapping("/save")
  public ResponseEntity<ApiResponse> saveReceipt(@RequestBody AddReceiptRequest request) {
    receiptService.saveReceipt(request);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.R100.name()).build(), HttpStatus.CREATED);
  }

  @GetMapping("/get")
  public ResponseEntity<BillReceiptSummary> getReceipts(
      @RequestParam("billNumber") long billNumber) {
    return new ResponseEntity<>(receiptService.getBillReceiptSummary(billNumber), HttpStatus.OK);
  }

  @GetMapping("/get-summary")
  public ResponseEntity<Summary<IReceiptSummary>> getReceiptSummary() {
    return new ResponseEntity<>(receiptService.getReceiptsSummary(), HttpStatus.OK);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<ApiResponse> deleteReceipt(@RequestParam("receiptId") long receiptId) {
    receiptService.deleteReceiptById(receiptId);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.R102.name()).build(), HttpStatus.ACCEPTED);
  }
}
