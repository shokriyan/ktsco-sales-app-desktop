package ktsco.app.models.general;

import java.math.BigDecimal;
import java.util.List;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Summary<T> {
  private BigDecimal totalAmount;
  private List<T> items;
}
