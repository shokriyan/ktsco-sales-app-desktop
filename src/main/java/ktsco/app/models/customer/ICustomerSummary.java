package ktsco.app.models.customer;

import java.math.BigDecimal;

public interface ICustomerSummary {
  long getCustomerId();

  String getCustomerName();

  BigDecimal getSaleTotal();

  BigDecimal getReceivedTotal();
}
