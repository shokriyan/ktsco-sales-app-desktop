package ktsco.app.exceptions;

import ktsco.app.codes.CodeMap;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class ErrorResponseException extends ResponseStatusException {
  private final String errorCode;

  public ErrorResponseException(HttpStatus status) {
    super(status);
    errorCode = "";
  }

  private ErrorResponseException(HttpStatus status, String reason) {
    super(status, reason);
    errorCode = reason;
  }

  public ErrorResponseException(HttpStatus status, CodeMap reason) {
    this(status, reason.name());
  }
}
