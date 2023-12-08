package ktsco.app.controllers;

import java.util.List;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Product;
import ktsco.app.models.general.ApiResponse;
import ktsco.app.models.product.AddProductRequest;
import ktsco.app.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {

  private final ProductService productService;

  @PostMapping("/save")
  public ResponseEntity<Product> saveProduct(@RequestBody AddProductRequest request) {
    return new ResponseEntity<>(productService.save(request), HttpStatus.CREATED);
  }

  @GetMapping("/get-all")
  public ResponseEntity<List<Product>> getAllProducts() {
    return new ResponseEntity<>(productService.findAllProducts(), HttpStatus.OK);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<ApiResponse> deleteProduct(@RequestParam("productId") long id) {
    productService.deleteProductById(id);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.P102.name()).build(), HttpStatus.ACCEPTED);
  }
}
