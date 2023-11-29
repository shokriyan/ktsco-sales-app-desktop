package ktsco.app.services;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Customer;
import ktsco.app.exceptions.ErrorResponseException;
import ktsco.app.models.customer.AddCustomerRequest;
import ktsco.app.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
@Service
public class CustomerService {

  private final CustomerRepository customerRepository;

  public Customer save(AddCustomerRequest request) {
    if (request.getCustomerName() == null || !StringUtils.hasText(request.getCustomerName()))
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.C100);
    var optionalCustomer = findByName(request.getCustomerName());
    if (optionalCustomer.isPresent())
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.C101);
    Customer customer = new Customer();
    customer.setCustomerName(request.getCustomerName());
    return customerRepository.save(customer);
  }

  public List<Customer> getCustomers() {
    List<Customer> customers = customerRepository.findAll();
    customers.sort(Comparator.comparing(Customer::getCustomerId).reversed());
    return customers;
  }

  public Optional<Customer> findByName(String customerName) {
    return getCustomers().stream()
        .filter(each -> each.getCustomerName().equals(customerName))
        .findFirst();
  }

  public Customer findById(long id) {
    return customerRepository
        .findById(id)
        .orElseThrow(() -> new ErrorResponseException(HttpStatus.NOT_FOUND, CodeMap.C102));
  }

  public void deleteCustomerById(long id) {
    var customer = findById(id);
    this.customerRepository.delete(customer);
  }
}
