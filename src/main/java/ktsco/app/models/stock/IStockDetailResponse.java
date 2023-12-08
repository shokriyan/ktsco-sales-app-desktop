package ktsco.app.models.stock;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface IStockDetailResponse {
  Long getBillNumber();

  LocalDate getDate();

  BigDecimal getQuantityIn();

  BigDecimal getQuantityOut();
}
