package ktsco.app.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import ktsco.app.entities.Stock;
import ktsco.app.models.stock.*;
import ktsco.app.models.stock.IStockDetailResponse;
import ktsco.app.models.stock.IStockQuantity;
import ktsco.app.repository.BillRepository;
import ktsco.app.repository.StockRepository;
import ktsco.app.utilities.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {
  private final StockRepository stockRepository;
  private final BillRepository billRepository;
  private final ProductService productService;

  public StockSaveResponse save(StockInRequest request) {
    Stock stock = new Stock();
    stock.setProduct(productService.findById(request.getProductId()));
    stock.setInDate(DateUtils.toLocalDate(request.getInDate()));
    stock.setQuantityIn(request.getQuantityIn());
    Stock savedStock = stockRepository.save(stock);
    return StockSaveResponse.builder()
        .stockId(savedStock.getStockId())
        .product(savedStock.getProduct())
        .inDate(DateUtils.toJalaliLocalDate(savedStock.getInDate()))
        .quantityIn(savedStock.getQuantityIn())
        .build();
  }

  public List<StockResponse> getStockReport() {
    var inStock = stockRepository.getStockIn();
    var outStock = billRepository.getStockOut();
    List<StockResponse> stockResponses = new ArrayList<>();
    inStock.forEach(
        in -> {
          BigDecimal outQuantity =
              outStock.stream()
                  .filter(out -> out.getProductId() == in.getProductId())
                  .map(IStockQuantity::getQuantity)
                  .reduce(BigDecimal.ZERO, BigDecimal::add);
          var product = productService.findById(in.getProductId());
          var response =
              StockResponse.builder()
                  .product(product)
                  .quantityIn(in.getQuantity())
                  .quantityOut(outQuantity)
                  .stockRemained(in.getQuantity().subtract(outQuantity))
                  .build();
          stockResponses.add(response);
        });
    return stockResponses;
  }

  public ProductStockResponse<StockDetailResponseDTO> getStockDetail(long productId) {
    ProductStockResponse<StockDetailResponseDTO> response = new ProductStockResponse<>();
    List<StockDetailResponseDTO> items = new ArrayList<>();
    response.setProduct(productService.findById(productId));
    var queryResponse = stockRepository.getStockDetailByProductId(productId);
    queryResponse.sort(Comparator.comparing(IStockDetailResponse::getDate).reversed());
    queryResponse.forEach(
        each -> {
          StockDetailResponseDTO detail = new StockDetailResponseDTO(each);
          items.add(detail);
        });

    response.setItems(items);
    return response;
  }
}
