package ktsco.app.repository;

import java.util.List;
import ktsco.app.entities.Customer;
import ktsco.app.models.customer.ICustomerSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

  @Query(
      value =
          "SELECT C.CUSTOMER_ID as customerID, C.CUSTOMER_NAME as customerName, IFNULL(SUM(B.LINE_TOTAL) , 0) AS saleTotal, IFNULL((SELECT SUM(RECEIPT_AMOUNT) FROM RECEIPTS WHERE CUSTOMER_ID = C.CUSTOMER_ID GROUP BY CUSTOMER_ID) , 0)\n"
              + "AS receivedTotal FROM CUSTOMER C\n"
              + "LEFT OUTER JOIN BILL B ON B.CUSTOMER_CUSTOMER_ID = C.CUSTOMER_ID\n"
              + "GROUP BY C.CUSTOMER_ID",
      nativeQuery = true)
  public List<ICustomerSummary> getCustomerSummary();
}
