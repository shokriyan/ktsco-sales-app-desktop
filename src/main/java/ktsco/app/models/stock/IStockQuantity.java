package ktsco.app.models.stock;

import java.math.BigDecimal;

public interface IStockQuantity {

  long getProductId();

  BigDecimal getQuantity();
}
