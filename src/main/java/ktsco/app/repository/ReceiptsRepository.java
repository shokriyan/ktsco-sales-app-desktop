package ktsco.app.repository;

import java.util.List;
import java.util.Optional;
import ktsco.app.entities.Receipts;
import ktsco.app.models.receipts.IReceiptSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReceiptsRepository extends JpaRepository<Receipts, Long> {

  List<Receipts> findAllByBillNumber(long billNumber);

  @Query(
      value =
          "SELECT BILL_NUMBER AS BILLNUMBER, BILL_RECEIVE_IN_FULL AS BILLRECEIVEDINFULL,SUM(RECEIPT_AMOUNT) AS TOTALRECEIPT FROM RECEIPTS GROUP BY BILL_NUMBER ",
      nativeQuery = true)
  List<IReceiptSummary> getReceiptsSummary();

  @Query(
      value =
          "SELECT BILL_NUMBER AS BILLNUMBER, BILL_RECEIVE_IN_FULL AS BILLRECEIVEDINFULL,SUM(RECEIPT_AMOUNT) AS TOTALRECEIPT FROM RECEIPTS WHERE BILL_NUMBER = ?1 GROUP BY BILL_NUMBER ",
      nativeQuery = true)
  Optional<IReceiptSummary> getReceiptSummary(long billNumber);

  List<Receipts> findAllByCustomerId(long customerId);
}
