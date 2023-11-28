package ktsco.app.repository;

import ktsco.app.entities.Bill;
import ktsco.app.models.intefaces.IBillSummaryInterface;
import ktsco.app.models.intefaces.IStockQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query(value = "SELECT BILL_NUMBER as billNumber, BILL_DATE as billDate,CUSTOMER_CUSTOMER_ID as customerId, SUM(LINE_TOTAL ) AS billTotal  FROM BILL GROUP BY BILL_NUMBER",
    nativeQuery = true)
    List<IBillSummaryInterface> getBillSummary();

    @Query(value = "SELECT PRODUCT_PRODUCT_ID as productId , SUM(QUANTITY) as quantity FROM BILL GROUP BY PRODUCT_PRODUCT_ID;" , nativeQuery = true)
    List<IStockQuantity> getStockOut();
}