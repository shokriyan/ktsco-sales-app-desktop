package ktsco.app.models.general;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse {
  private String code;
}
