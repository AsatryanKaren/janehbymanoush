/**
 * Phrases stored when the customer left no message (API / tooling placeholders).
 * Shown as em dash in admin instead of the literal string.
 */
const EMPTY_MESSAGE_SENTINELS = new Set(
  ["optional message"].map((s) => s.toLowerCase()),
);

/**
 * Returns the message text for admin UI, or "—" when there is no real message.
 */
export const adminOrderMessageDisplay = (
  raw: string | null | undefined,
): string => {
  const t = raw?.trim() ?? "";
  if (t === "") return "—";
  if (EMPTY_MESSAGE_SENTINELS.has(t.toLowerCase())) return "—";
  return t;
};
