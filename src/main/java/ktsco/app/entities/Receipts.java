package ktsco.app.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Receipts {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long receiptId;

  private long billNumber;
  private long customerId;
  private LocalDate receiptDate;
  private String description;
  private BigDecimal receiptAmount;
  private boolean billReceiveInFull;
}
