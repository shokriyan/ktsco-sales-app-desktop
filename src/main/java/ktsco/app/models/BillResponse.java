package ktsco.app.models;

import ktsco.app.entities.Customer;
import ktsco.app.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BillResponse {
    private long billId;
    private Customer customer;
    private String billDate;
    private long billNumber;
    private Product product;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;
}
