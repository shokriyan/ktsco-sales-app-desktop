package ktsco.app.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Receipts;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.general.Summary;
import ktsco.app.models.receipts.AddReceiptRequest;
import ktsco.app.models.receipts.BillReceiptSummary;
import ktsco.app.models.receipts.IReceiptSummary;
import ktsco.app.models.receipts.ReceiptResponse;
import ktsco.app.repository.BillRepository;
import ktsco.app.repository.ReceiptsRepository;
import ktsco.app.utilities.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReceiptService {

  private final ReceiptsRepository receiptsRepository;
  private final BillRepository billRepository;

  public void saveReceipt(AddReceiptRequest request) {
    var bill = billRepository.getBillSummary(request.getBillNumber());
    var receipts = receiptsRepository.getReceiptSummary(request.getBillNumber());
    if (bill.isPresent()) {
      BigDecimal billTotal = bill.get().getBillTotal();
      BigDecimal totalReceipts = request.getReceiptAmount();
      if (receipts.isPresent())
        totalReceipts = receipts.get().getTotalReceipt().add(request.getReceiptAmount());

      if (totalReceipts.compareTo(billTotal) > 0) {
        throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.R101);
      }
    }

    receiptsRepository.save(request.getReceipt());
    updateReceiptInFull(request.getBillNumber());
  }

  public void updateReceiptInFull(long billNumber) {
    var billSummary = billRepository.getBillSummary(billNumber);
    var receiptSummary = receiptsRepository.getReceiptSummary(billNumber);
    if (billSummary.isPresent()
        && receiptSummary.isPresent()
        && (billSummary.get().getBillTotal().compareTo(receiptSummary.get().getTotalReceipt())
            == 0)) {
      List<Receipts> receipts = receiptsRepository.findAllByBillNumber(billNumber);
      receipts.forEach(
          each -> {
            each.setBillReceiveInFull(true);
            receiptsRepository.save(each);
          });
    }
  }

  public List<ReceiptResponse> getReceiptByBillNumber(long billNumber) {
    var receipts = receiptsRepository.findAllByBillNumber(billNumber);
    return receipts.stream()
        .map(
            each ->
                new ReceiptResponse(
                    each.getReceiptId(),
                    each.getBillNumber(),
                    DateUtils.toJalaliLocalDate(each.getReceiptDate()),
                    each.getDescription(),
                    each.getReceiptAmount()))
        .collect(Collectors.toList());
  }

  public Summary<IReceiptSummary> getReceiptsSummary() {
    var receiptSummary = receiptsRepository.getReceiptsSummary();
    Summary<IReceiptSummary> summary = new Summary<>();
    summary.setItems(receiptSummary);
    summary.setTotalAmount(
        receiptSummary.stream()
            .map(IReceiptSummary::getTotalReceipt)
            .reduce(BigDecimal.ZERO, BigDecimal::add));
    return summary;
  }

  public BillReceiptSummary getBillReceiptSummary(long billNumber) {
    var optionalSummary = receiptsRepository.getReceiptSummary(billNumber);
    if (optionalSummary.isPresent())
      return BillReceiptSummary.builder()
          .receiptSummary(optionalSummary.get())
          .receiptResponses(getReceiptByBillNumber(billNumber))
          .build();

    throw new ErrorResponseException(HttpStatus.NOT_FOUND, CodeMap.R104);
  }

  public void deleteReceiptById(long receiptId) {
    try {
      receiptsRepository.deleteById(receiptId);
    }catch (Exception ex) {
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.R104);
    }
  }
}
