package ktsco.app.services;

import java.util.List;
import java.util.Optional;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Product;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.product.AddProductRequest;
import ktsco.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;

  public Product save(AddProductRequest request) {
    var existingProduct = findByProductName(request.getProductName());
    if (existingProduct.isPresent())
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.P100);
    Product product = new Product();
    product.setProductName(request.getProductName());
    product.setUnit(request.getUnit());
    return productRepository.save(product);
  }

  public Optional<Product> findByProductName(String productName) {
    return productRepository.findByProductName(productName);
  }

  public List<Product> findAllProducts() {
    return productRepository.findAll();
  }

  public Product findById(long id) {
    return productRepository
        .findById(id)
        .orElseThrow(() -> new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.P101));
  }

  public void deleteProductById(long id) {
    var product = findById(id);
    productRepository.delete(product);
  }
}
