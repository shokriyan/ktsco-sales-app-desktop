package ktsco.app.services;

import ktsco.app.codes.CustomerCodes;
import ktsco.app.entities.Customer;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.AddCustomerRequest;
import ktsco.app.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public Customer save(AddCustomerRequest request) {
        if (request.getCustomerName() == null || !StringUtils.hasText(request.getCustomerName()))
            throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CustomerCodes.C100.name());
        var optionalCustomer = findByName(request.getCustomerName());
        if (optionalCustomer.isPresent())
            throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CustomerCodes.C101.name());
        Customer customer = new Customer();
        customer.setCustomerName(request.getCustomerName());
        return customerRepository.save(customer);
    }

    public List<Customer> getCustomers() {List<Customer> customers = customerRepository.findAll();
        customers.sort(Comparator.comparing(Customer::getCustomerId).reversed());
        return customers;
    }

    public Optional<Customer> findByName(String customerName) {
        return getCustomers().stream().filter(each -> each.getCustomerName().equals(customerName))
                .findFirst();
    }

    public Customer findById(long id) {
        return customerRepository.findById(id).orElseThrow(() -> new ErrorResponseException(HttpStatus.NOT_FOUND, CustomerCodes.C102.name()));
    }

    public void deleteCustomerById(long id) {
        var customer = findById(id);
        this.customerRepository.delete(customer);
    }
}
