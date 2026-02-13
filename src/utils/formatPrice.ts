export const formatPrice = (
  amount: number,
  currency = "USD",
  locale = "en",
): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
