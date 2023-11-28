package ktsco.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
