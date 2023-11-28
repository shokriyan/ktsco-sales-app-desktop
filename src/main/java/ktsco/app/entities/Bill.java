package ktsco.app.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long billId;

    @OneToOne
    private Customer customer;

    private LocalDate billDate;
    private long billNumber;

    @OneToOne
    private Product product;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;



}
