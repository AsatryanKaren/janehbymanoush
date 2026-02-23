/** Armenian Dram symbol (used instead of "AMD" for display) */
const DRAM_SYMBOL = "֏";

export const formatPrice = (
  amount: number,
  currency = "USD",
  locale = "en",
): string => {
  if (currency === "AMD") {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `${formatted} ${DRAM_SYMBOL}`;
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
