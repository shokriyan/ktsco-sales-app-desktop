package ktsco.app.controllers;

import ktsco.app.codes.CodeMap;
import ktsco.app.models.bill.BillSummary;
import ktsco.app.models.bill.SaleBillRequest;
import ktsco.app.models.bill.SaleBillResponse;
import ktsco.app.models.general.ApiResponse;
import ktsco.app.models.general.Summary;
import ktsco.app.services.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bill")
@RequiredArgsConstructor
@CrossOrigin
public class BillController {
  private final BillService billService;

  @PostMapping("/save")
  public ResponseEntity<ApiResponse> saveBill(@RequestBody SaleBillRequest request) {
    billService.saveBillRequest(request);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.B100.name()).build(), HttpStatus.CREATED);
  }

  @GetMapping("/summary")
  public ResponseEntity<Summary<BillSummary>> getBillSummary(
      @RequestParam(value = "customerId", required = false) Long customerId,
      @RequestParam(value = "startDate", required = false) String startDate,
      @RequestParam(value = "endDate", required = false) String endDate) {
    return new ResponseEntity<>(
        billService.findBillSummary(customerId, startDate, endDate), HttpStatus.OK);
  }

  @GetMapping("/get-bill")
  public ResponseEntity<SaleBillResponse> getBill(@RequestParam("billNumber") long billNumber) {
    return new ResponseEntity<>(billService.getBillByNumber(billNumber), HttpStatus.OK);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<ApiResponse> deleteBill(@RequestParam("billNumber") long billNumber) {
    billService.deleteBillByBillNumber(billNumber);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.B103.name()).build(), HttpStatus.ACCEPTED);
  }
}
