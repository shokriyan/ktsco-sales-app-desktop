package ktsco.app.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Bill;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.bill.*;
import ktsco.app.models.general.Summary;
import ktsco.app.models.receipts.IReceiptSummary;
import ktsco.app.repository.BillRepository;
import ktsco.app.repository.ReceiptsRepository;
import ktsco.app.utilities.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BillService {
  private final BillRepository billRepository;
  private final CustomerService customerService;
  private final ProductService productService;
  private final ReceiptsRepository receiptsRepository;

  public void saveBillRequest(SaleBillRequest request) {
    List<Bill> billsByNumber = billRepository.findBillsByBillNumber(request.getBillNumber());
    if (!billsByNumber.isEmpty()) {
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.B101);
    }
    var customer = customerService.findById(request.getCustomerId());
    LocalDate billDate = DateUtils.toLocalDate(request.getBillDate());

    request
        .getBillDetailRequests()
        .forEach(
            detail -> {
              var product = productService.findById(detail.getProductId());
              Bill bill = new Bill();
              bill.setCustomer(customer);
              bill.setBillNumber(request.getBillNumber());
              bill.setBillDate(billDate);
              bill.setProduct(product);
              bill.setQuantity(detail.getQuantity());
              bill.setUnitPrice(detail.getUnitPrice());
              bill.setLineTotal(detail.getQuantity().multiply(detail.getUnitPrice()));
              save(bill);
            });
  }

  public void save(Bill bill) {
    billRepository.save(bill);
  }

  public SaleBillResponse getBillByNumber(long billNumber) {
    List<SaleBillDetailResponse> billDetailsResponses = new ArrayList<>();
    var bills = billRepository.findBillsByBillNumber(billNumber);
    if (bills.isEmpty()) {
      throw new ErrorResponseException(HttpStatus.NOT_FOUND, CodeMap.B104);
    }
    bills.forEach(
        each -> {
          var billResponse =
              SaleBillDetailResponse.builder()
                  .billId(each.getBillId())
                  .product(each.getProduct())
                  .quantity(each.getQuantity())
                  .unitPrice(each.getUnitPrice())
                  .lineTotal(each.getLineTotal())
                  .build();
          billDetailsResponses.add(billResponse);
        });
    return SaleBillResponse.builder()
        .billDetails(billDetailsResponses)
        .billNumber(billNumber)
        .billDate(DateUtils.toJalaliLocalDate(bills.get(0).getBillDate()))
        .customer(bills.get(0).getCustomer())
        .build();
  }

  public List<Bill> findAllBills() {
    return billRepository.findAll();
  }

  public Summary<BillSummary> findBillSummary(
      Long customerId, String jalaliStartDate, String jalaliEndDate) {
    List<IBillSummaryInterface> filteredByCustomer;
    var bills = billRepository.getBillSummary();
    if (customerId != null && customerId != 0) {
      filteredByCustomer =
          bills.stream()
              .filter(each -> each.getCustomerId() == customerId)
              .collect(Collectors.toList());
    } else {
      filteredByCustomer = bills;
    }
    LocalDate startDate;
    if (jalaliStartDate != null && !jalaliStartDate.isEmpty()) {
      startDate = DateUtils.toLocalDate(jalaliStartDate);
    } else {
      startDate = LocalDate.of(2000, 1, 1);
    }
    LocalDate endDate;
    if (jalaliEndDate != null && !jalaliEndDate.isEmpty())
      endDate = DateUtils.toLocalDate(jalaliEndDate);
    else endDate = LocalDate.of(4000, 12, 31);

    var filtered =
        filteredByCustomer.stream()
            .filter(
                each ->
                    each.getBillDate().isAfter(startDate) && each.getBillDate().isBefore(endDate))
            .collect(Collectors.toList());
    return getSummary(filtered);
  }

  private Summary<BillSummary> getSummary(List<IBillSummaryInterface> bills) {
    List<BillSummary> summaries = new ArrayList<>();
    bills.forEach(
        each -> {
          var customer = customerService.findById(each.getCustomerId());
          Optional<IReceiptSummary> billReceipt =
              receiptsRepository.getReceiptSummary(each.getBillNumber());
          summaries.add(
              BillSummary.builder()
                  .customer(customer)
                  .billNumber(each.getBillNumber())
                  .billTotal(each.getBillTotal())
                  .billDate(DateUtils.toJalaliLocalDate(each.getBillDate()))
                  .receivedTotal(
                      billReceipt.map(IReceiptSummary::getTotalReceipt).orElse(BigDecimal.ZERO))
                  .receivedInFull(
                      billReceipt.map(IReceiptSummary::getBillReceivedInFull).orElse(false))
                  .build());
        });
    summaries.sort(Comparator.comparing(BillSummary::getBillDate).reversed());

    Summary<BillSummary> summary = new Summary<>();
    summary.setItems(summaries);
    summary.setTotalAmount(
        summaries.stream().map(BillSummary::getBillTotal).reduce(BigDecimal.ZERO, BigDecimal::add));
    return summary;
  }

  public void deleteBillByBillNumber(long billNumber) {
    var billReceipts = receiptsRepository.findAllByBillNumber(billNumber);
    if (!billReceipts.isEmpty())
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.B102);
    billRepository.deleteAll(billRepository.findBillsByBillNumber(billNumber));
  }
}
