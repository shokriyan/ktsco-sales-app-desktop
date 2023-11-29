package ktsco.app.models.bill;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SaleBillRequest {
  private long customerId;
  private String billDate;
  private long billNumber;
  private List<BillDetail> billDetails;
}
