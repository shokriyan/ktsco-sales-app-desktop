package ktsco.app;

import java.awt.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class KtscoSalesAppApplication {

  @Value("${base_url}")
  private static String baseURL;

  public static void main(String[] args) {
    SpringApplication.run(KtscoSalesAppApplication.class, args);
  }

  //  @EventListener({ApplicationReadyEvent.class})
  //  public void applicationReadyEvent() {
  //     openBrowser();
  //  }
  //
  //  private static void openBrowser() {
  //    if (Desktop.isDesktopSupported()) {
  //      Desktop desktop = Desktop.getDesktop();
  //      try {
  //        desktop.browse(new URI(baseURL));
  //      } catch (IOException | URISyntaxException ex) {
  //        log.error("Error while lunching app with Windows ", ex);
  //      }
  //    } else {
  //      Runtime runtime = Runtime.getRuntime();
  //      try {
  //        runtime.exec(
  //            new String[] {"/usr/bin/open", "-a", "/Applications/Google Chrome.app", baseURL});
  //      } catch (IOException ex) {
  //        log.error("Error while lunching app with OS ", ex);
  //      }
  //    }
  //  }
}
