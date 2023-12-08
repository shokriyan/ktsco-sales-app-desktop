package ktsco.app.repository;

import java.util.Optional;
import ktsco.app.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

  Optional<Product> findByProductName(String productName);
}
