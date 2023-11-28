package ktsco.app.models;

import ktsco.app.entities.Product;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class StockResponse {
    private Product product;
    private BigDecimal quantityIn;
    private BigDecimal quantityOut;
    private BigDecimal stockRemained;
}
