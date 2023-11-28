package ktsco.app.entities;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockId;
    @OneToOne
    private Product product;
    private LocalDate inDate;

    private BigDecimal quantityIn;

}
