package ktsco.app.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@ControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(value = {ErrorResponseException.class})
    public final ResponseEntity<ErrorResponse> handleCustomerException(ErrorResponseException exception, WebRequest webRequest) {
        return new ResponseEntity<>(ErrorResponse.builder()
                .errorCode(exception.getErrorCode()).build(), exception.getStatus());
    }
}
