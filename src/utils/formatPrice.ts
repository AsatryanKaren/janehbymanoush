/** Armenian Dram symbol (used instead of "AMD" for display) */
const DRAM_SYMBOL = "֏";

/** Same number format for all languages: comma as thousands separator, no decimals */
const PRICE_NUMBER_LOCALE = "en-US";

export const formatPrice = (
  amount: number,
  currency = "USD",
  _locale = "en",
): string => {
  if (currency === "AMD") {
    const formatted = new Intl.NumberFormat(PRICE_NUMBER_LOCALE, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `${DRAM_SYMBOL} ${formatted}`;
  }
  const formatted = new Intl.NumberFormat(PRICE_NUMBER_LOCALE, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  const symbol = new Intl.NumberFormat(PRICE_NUMBER_LOCALE, {
    style: "currency",
    currency,
  })
    .formatToParts(0)
    .find((p) => p.type === "currency")?.value ?? currency;
  return `${symbol} ${formatted}`;
};
