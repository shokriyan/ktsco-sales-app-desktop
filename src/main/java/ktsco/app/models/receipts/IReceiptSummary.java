package ktsco.app.models.receipts;

import java.math.BigDecimal;

public interface IReceiptSummary {

  Long getBillNumber();

  BigDecimal getTotalReceipt();

  boolean getBillReceivedInFull();
}
