package ktsco.app.controllers;

import java.util.List;
import ktsco.app.codes.CodeMap;
import ktsco.app.entities.Customer;
import ktsco.app.models.customer.AddCustomerRequest;
import ktsco.app.models.general.ApiResponse;
import ktsco.app.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/customer")
public class CustomerController {
  private final CustomerService customerService;

  @PostMapping("/save")
  public ResponseEntity<Customer> saveCustomer(@RequestBody AddCustomerRequest addCustomerRequest) {
    return new ResponseEntity<>(customerService.save(addCustomerRequest), HttpStatus.CREATED);
  }

  @GetMapping("/all")
  public ResponseEntity<List<Customer>> getAllCustomers() {
    return new ResponseEntity<>(customerService.getCustomers(), HttpStatus.OK);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<ApiResponse> deleteCustomer(@RequestParam("customerId") long customerId) {
    customerService.deleteCustomerById(customerId);
    return new ResponseEntity<>(
        ApiResponse.builder().code(CodeMap.C103.name()).build(), HttpStatus.ACCEPTED);
  }
}
