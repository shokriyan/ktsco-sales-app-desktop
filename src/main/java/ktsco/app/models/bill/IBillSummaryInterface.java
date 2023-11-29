package ktsco.app.models.bill;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface IBillSummaryInterface {

  long getBillNumber();

  long getCustomerId();

  LocalDate getBillDate();

  BigDecimal getBillTotal();
}
