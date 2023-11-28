package ktsco.app.models;

import ktsco.app.models.intefaces.IStockDetailResponse;
import ktsco.app.utilities.DateUtils;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class StockDetailResponseDTO {
    private final long billNumber;
    private final BigDecimal quantityIn;
    private final BigDecimal quantityOut;
    private final String date;

    public StockDetailResponseDTO(IStockDetailResponse stockDetailResponse) {
        this.billNumber =  stockDetailResponse.getBillNumber() != null ? stockDetailResponse.getBillNumber() : 0;
        this.quantityIn = stockDetailResponse.getQuantityIn();
        this.quantityOut = stockDetailResponse.getQuantityOut();
        this.date = DateUtils.toJalaliLocalDate(stockDetailResponse.getDate());
    }

}
