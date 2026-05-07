/**
 * Pending-payment handoff between Checkout (before redirect to EPG) and the
 * `/payment/status` polling page (after the bank redirects back). `sessionStorage`
 * is the right scope: it survives the full-page navigation to the bank in the
 * same tab, but is cleared automatically when the tab closes.
 */
const STORAGE_KEY = "janeh.payment.pending";

export type PendingPayment = {
  epgOrderId: string;
  orderId: string;
  paymentId: string;
  /** ms since epoch when register succeeded — used to anchor polling timeouts. */
  startedAt: number;
};

const isBrowser = (): boolean =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export const savePending = (payload: Omit<PendingPayment, "startedAt">): void => {
  if (!isBrowser()) return;
  const value: PendingPayment = { ...payload, startedAt: Date.now() };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Quota / privacy mode — non-fatal; polling page will fall back to noPayment UI.
  }
};

export const getPending = (): PendingPayment | null => {
  if (!isBrowser()) return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (raw == null || raw === "") return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PendingPayment>;
    if (
      typeof parsed.epgOrderId === "string" &&
      typeof parsed.orderId === "string" &&
      typeof parsed.paymentId === "string" &&
      typeof parsed.startedAt === "number"
    ) {
      return parsed as PendingPayment;
    }
    return null;
  } catch {
    return null;
  }
};

export const clearPending = (): void => {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
