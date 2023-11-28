package ktsco.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillDetail {
    private long productId;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private  BigDecimal lineTotal;

}
