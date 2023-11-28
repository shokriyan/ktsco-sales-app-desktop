package ktsco.app.models;

import ktsco.app.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductStockResponse<T>{
    private Product product;
    private List<T> items;
}
