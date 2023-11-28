package ktsco.app.repository;

import ktsco.app.entities.Stock;
import ktsco.app.models.intefaces.IStockDetailResponse;
import ktsco.app.models.intefaces.IStockQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {

    @Query(value = "SELECT PRODUCT_PRODUCT_ID as productId , SUM(QUANTITY_IN) as quantity FROM STOCK GROUP BY PRODUCT_PRODUCT_ID;", nativeQuery = true)
    List<IStockQuantity> getStockIn();


    @Query(value = "Select NULL as billNumber, IN_DATE as date , Quantity_IN as quantityIn, NULL as quantityOut from stock " +
            "where PRODUCT_PRODUCT_ID  = ?1 " +
            "union all " +
            "Select BILL_NUMBER , BILL_DATE , NULL , QUANTITY from BILL " +
            "where PRODUCT_PRODUCT_ID = ?1" , nativeQuery = true)
    List<IStockDetailResponse> getStockDetailByProductId(long productId);
}