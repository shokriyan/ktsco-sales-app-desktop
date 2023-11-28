export interface ErrorResponse {
  errorCode: string;
}

export interface ApiResponse {
  code: string;
}

export function codeMap(key: string | undefined) {
  if (!key) return "";
  const errorCodeMap: { [key: string]: string } = {
    C100: "نام مشتری را وارد کنید",
    C101: "مشتری با این نام قبلا ثبت شده است",
    C102: "مشتری با این آی دی ثبت نشده است",
    C103: "مشتری با موفقیت حذف شد",
    D100: "تاریخ باید از - استفاده کندی",
    D101: " تاریخ غلط است روز ماه یا سال را چک کنید",
    B100: "بل فروش ثبت شد",
    B101: "شماره بل تکراری میباشد",
    P100: "محصول قبلا ثبت شده است",
  };

  return errorCodeMap[key];
}
