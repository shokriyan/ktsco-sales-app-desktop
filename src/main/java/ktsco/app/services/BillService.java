package ktsco.app.services;

import ktsco.app.codes.BillCode;
import ktsco.app.entities.Bill;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.BillResponse;
import ktsco.app.models.BillSummary;
import ktsco.app.models.SaleBillRequest;
import ktsco.app.models.Summary;
import ktsco.app.models.intefaces.IBillSummaryInterface;
import ktsco.app.repository.BillRepository;
import ktsco.app.utilities.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService {
    private final BillRepository billRepository;
    private final CustomerService customerService;
    private final ProductService productService;


    public void saveBillRequest(SaleBillRequest request) {
        List<BillResponse> billsByNumber = getBillByNumber(request.getBillNumber());
        if (!billsByNumber.isEmpty()) {
            throw new ErrorResponseException(HttpStatus.BAD_REQUEST, BillCode.B101.name());
        }
        var customer = customerService.findById(request.getCustomerId());
        LocalDate billDate = DateUtils.toLocalDate(request.getBillDate());

        request.getBillDetails().forEach(detail -> {
            var product = productService.findById(detail.getProductId());
            Bill bill = new Bill();
            bill.setCustomer(customer);
            bill.setBillNumber(request.getBillNumber());
            bill.setBillDate(billDate);
            bill.setProduct(product);
            bill.setQuantity(detail.getQuantity());
            bill.setUnitPrice(detail.getUnitPrice());
            bill.setLineTotal(detail.getQuantity().multiply(detail.getUnitPrice()));
            save(bill);
        });
    }

    public void save(Bill bill) {
        billRepository.save(bill);
    }

    public List<BillResponse> getBillByNumber(long billNumber) {
        List<BillResponse> billResponses = new ArrayList<>();
        var bills = findAllBills().stream().filter(bill -> bill.getBillNumber() == billNumber).collect(Collectors.toList());
        bills.forEach(each -> {
            String jalaliDate = DateUtils.toJalaliLocalDate(each.getBillDate());
            var billResponse =BillResponse.builder()
                    .customer(each.getCustomer())
                    .billDate(jalaliDate)
                    .billId(each.getBillId())
                    .billNumber(each.getBillNumber())
                    .product(each.getProduct())
                    .quantity(each.getQuantity())
                    .unitPrice(each.getUnitPrice())
                    .lineTotal(each.getLineTotal())
                    .build();
            billResponses.add(billResponse);
        });
        return billResponses;
    }

    public List<Bill> findAllBills() {
        return billRepository.findAll();
    }

    public Summary<BillSummary> findBillSummary(Long customerId, String jalaliStartDate, String jalaliEndDate) {
        List<IBillSummaryInterface> filteredByCustomer;
        var bills = billRepository.getBillSummary();
        if (customerId != null && customerId != 0) {
            filteredByCustomer = bills.stream().filter(each -> each.getCustomerId() == customerId).collect(Collectors.toList());
        } else {
            filteredByCustomer = bills;
        }
        LocalDate startDate;
        if (jalaliStartDate != null && !jalaliStartDate.isEmpty()) {
            startDate = DateUtils.toLocalDate(jalaliStartDate);
        } else {
            startDate = LocalDate.of(2000, 1 , 1);
        }
        LocalDate endDate;
        if (jalaliEndDate != null && !jalaliEndDate.isEmpty())
            endDate = DateUtils.toLocalDate(jalaliEndDate);
        else endDate = LocalDate.of(4000, 12,31);

        var filtered = filteredByCustomer.stream().filter(each -> each.getBillDate().isAfter(startDate) && each.getBillDate().isBefore(endDate)).collect(Collectors.toList());
        return getSummary(filtered);
    }

    private Summary<BillSummary> getSummary(List<IBillSummaryInterface> bills) {
        List<BillSummary> summaries = new ArrayList<>();
        bills.forEach(each -> {
            var customer = customerService.findById(each.getCustomerId());
            summaries.add(BillSummary.builder()
                    .customer(customer)
                    .billNumber(each.getBillNumber())
                    .billTotal(each.getBillTotal())
                    .billDate(DateUtils.toJalaliLocalDate(each.getBillDate()))
                    .build());
        });
        summaries.sort(Comparator.comparing(BillSummary::getBillDate).reversed());

        Summary<BillSummary> summary = new Summary<>();
        summary.setItems(summaries);
        summary.setTotalAmount(summaries.stream().map(BillSummary::getBillTotal).reduce(BigDecimal.ZERO, BigDecimal::add));
        return summary;
    }


}
