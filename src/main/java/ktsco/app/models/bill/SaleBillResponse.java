package ktsco.app.models.bill;

import java.math.BigDecimal;
import java.util.List;
import ktsco.app.entities.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class SaleBillResponse {
  private Customer customer;
  private String billDate;
  private long billNumber;
  private List<SaleBillDetailResponse> billDetails;

  public BigDecimal getBillTotal() {
    return billDetails.stream()
        .map(SaleBillDetailResponse::getLineTotal)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}
