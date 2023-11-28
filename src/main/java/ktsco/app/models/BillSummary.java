package ktsco.app.models;

import ktsco.app.entities.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillSummary {
    private long billNumber;
    private Customer customer;
    private String billDate;
    private BigDecimal billTotal;
}
