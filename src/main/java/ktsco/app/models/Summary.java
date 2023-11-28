package ktsco.app.models;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Summary<T>{
    private BigDecimal totalAmount;
    private List<T> items;
}
