package ktsco.app.models.stock;

import java.util.List;
import ktsco.app.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductStockResponse<T> {
  private Product product;
  private List<T> items;
}
