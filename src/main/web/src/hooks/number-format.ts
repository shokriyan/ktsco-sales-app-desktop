export function currency(number: number) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(number);
}

export function numberFormat(number: number) {
  return new Intl.NumberFormat().format(number);
}
