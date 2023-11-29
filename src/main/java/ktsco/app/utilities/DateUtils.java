package ktsco.app.utilities;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.regex.PatternSyntaxException;
import ktsco.app.codes.CodeMap;
import ktsco.app.exceptions.ErrorResponseException;
import org.springframework.http.HttpStatus;

public class DateUtils {
  private static final String KABUL_TIME_ZONE = "Asia/Kabul";
  private static final DateTimeFormatter DEFAULT_DATE_FORMAT =
      DateTimeFormatter.ofPattern("yyyy-M-d");

  private DateUtils() {}

  /**
   * Converting Jalali Date to Gregorian LocalDate Object.
   *
   * @param date Jalali Date
   * @return Gregorian LocalDate Object with Kabul Zone ID
   */
  public static LocalDate toLocalDate(String date) {
    int[] parsed = convertJalaliDate(date);
    String converted = JalaliDateUtil.jalaliToGregorian(parsed[0], parsed[1], parsed[2]);
    return LocalDate.parse(converted, DEFAULT_DATE_FORMAT);
  }

  /**
   * Convert LocalDate to Jalali Date.
   *
   * @param localDate LocalDate Gregorian
   * @return String Jalali Date
   */
  public static String toJalaliLocalDate(LocalDate localDate) {
    return JalaliDateUtil.gregorianToJalali(
        localDate.getYear(), localDate.getMonthValue(), localDate.getDayOfMonth());
  }

  /**
   * Converting Jalali Date with Format yyyy-MM-dd. example 1402-12-21
   *
   * @param date Jalali Date to Parse
   */
  private static int[] convertJalaliDate(String date) {
    try {
      String[] splitDate = date.split("-");
      int year = Integer.parseInt(splitDate[0]);
      int month = Integer.parseInt(splitDate[1]);
      int day = Integer.parseInt(splitDate[2]);
      if (month > 12 || day > 31 || year <= 1300) {
        throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.D101);
      }
      return new int[] {year, month, day};
    } catch (PatternSyntaxException ex) {
      throw new ErrorResponseException(HttpStatus.BAD_REQUEST, CodeMap.D100);
    }
  }
}
