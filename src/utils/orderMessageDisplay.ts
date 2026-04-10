/**
 * Phrases stored when the customer left no message (API / tooling placeholders).
 * Shown as em dash in admin instead of the literal string.
 */
const EMPTY_MESSAGE_SENTINELS = new Set(
  ["optional message"].map((s) => s.toLowerCase()),
);

/**
 * Checkout appends a ring-sizes sentence to `message` when multiple rings (i18n).
 * Strip those segments in admin so sizes show only on line items.
 */
const isCheckoutRingSizesMessageSegment = (segment: string): boolean => {
  const s = segment.trim();
  if (s.toLowerCase().startsWith("ring sizes:")) return true;
  if (s.toLowerCase().startsWith("размеры колец:")) return true;
  if (s.startsWith("Մատանու չափսեր՝")) return true;
  return false;
};

/**
 * Removes ` | `-delimited ring-size note segments from an order message.
 */
export const stripRingSizesSegmentsFromOrderMessage = (message: string): string => {
  const parts = message
    .split(" | ")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const filtered = parts.filter((p) => !isCheckoutRingSizesMessageSegment(p));
  if (filtered.length === 0) return "—";
  return filtered.join(" | ");
};

/**
 * Returns the message text for admin UI, or "—" when there is no real message.
 */
export const adminOrderMessageDisplay = (
  raw: string | null | undefined,
): string => {
  const t = raw?.trim() ?? "";
  if (t === "") return "—";
  if (EMPTY_MESSAGE_SENTINELS.has(t.toLowerCase())) return "—";
  return stripRingSizesSegmentsFromOrderMessage(t);
};
