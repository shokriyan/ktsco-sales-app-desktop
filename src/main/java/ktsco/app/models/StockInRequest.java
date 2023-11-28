package ktsco.app.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StockInRequest {
    private long productId;
    private String inDate;
    private BigDecimal quantityIn;
}
