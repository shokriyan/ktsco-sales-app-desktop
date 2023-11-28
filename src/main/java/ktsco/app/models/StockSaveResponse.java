package ktsco.app.models;

import ktsco.app.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class StockSaveResponse {
    private long stockId;
    private Product product;
    private String inDate;

    private BigDecimal quantityIn;
}
