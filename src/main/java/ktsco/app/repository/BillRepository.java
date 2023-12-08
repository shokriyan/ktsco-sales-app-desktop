package ktsco.app.repository;

import java.util.List;
import java.util.Optional;
import ktsco.app.entities.Bill;
import ktsco.app.models.bill.IBillSummaryInterface;
import ktsco.app.models.stock.IStockQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillRepository extends JpaRepository<Bill, Long> {

  @Query(
      value =
          "SELECT BILL_NUMBER as billNumber, BILL_DATE as billDate,CUSTOMER_CUSTOMER_ID as customerId, SUM(LINE_TOTAL ) AS billTotal  FROM BILL GROUP BY BILL_NUMBER",
      nativeQuery = true)
  List<IBillSummaryInterface> getBillSummary();

  @Query(
      value =
          "SELECT PRODUCT_PRODUCT_ID as productId , SUM(QUANTITY) as quantity FROM BILL GROUP BY PRODUCT_PRODUCT_ID;",
      nativeQuery = true)
  List<IStockQuantity> getStockOut();

  @Query(
      value =
          "SELECT BILL_NUMBER as billNumber, BILL_DATE as billDate,CUSTOMER_CUSTOMER_ID as customerId, "
              + "SUM(LINE_TOTAL ) AS billTotal  FROM BILL WHERE BILL_NUMBER = ?1 GROUP BY BILL_NUMBER",
      nativeQuery = true)
  Optional<IBillSummaryInterface> getBillSummary(long billNumber);

  List<Bill> findBillsByBillNumber(Long billNumber);

  @Query(value = "select * from BILL b where b.CUSTOMER_CUSTOMER_ID = ?1", nativeQuery = true)
  List<Bill> findBillsByCustomer(long customerId);
}
