package ktsco.app.controllers;

import java.util.List;
import ktsco.app.models.stock.*;
import ktsco.app.services.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
@CrossOrigin
public class StockController {

  private final StockService stockService;

  @PostMapping("/save")
  public ResponseEntity<StockSaveResponse> save(@RequestBody StockInRequest request) {
    return new ResponseEntity<>(stockService.save(request), HttpStatus.CREATED);
  }

  @GetMapping("/stock-report")
  public ResponseEntity<List<StockResponse>> getStockReport() {
    return new ResponseEntity<>(stockService.getStockReport(), HttpStatus.OK);
  }

  @GetMapping("/detail")
  public ResponseEntity<ProductStockResponse<StockDetailResponseDTO>> getStockDetail(
      @RequestParam("productId") long productId) {
    return new ResponseEntity<>(stockService.getStockDetail(productId), HttpStatus.OK);
  }
}
