/** POST /v1/orders — matches API contract */
export type PaymentType = "online" | "onPickup";

/**
 * Backend `PaymentStatus` numeric enum.
 *
 * NOTE: in practice the API may serialize this as a lowercase string
 * (e.g. `"declined"`) instead of the numeric enum value. Always normalize
 * via `isTerminalFailure` / `isSuccessStatus`, which accept either form.
 */
export enum PaymentStatusCode {
  Created = 0,
  Registered = 1,
  Authorized = 2,
  Deposited = 3,
  Reversed = 4,
  Refunded = 5,
  PartiallyRefunded = 6,
  Declined = 7,
  Failed = 8,
}

/** API may return either the numeric enum or its lowercase name. */
export type PaymentStatusValue = PaymentStatusCode | string;

const STATUS_NAME_BY_CODE: Record<PaymentStatusCode, string> = {
  [PaymentStatusCode.Created]: "created",
  [PaymentStatusCode.Registered]: "registered",
  [PaymentStatusCode.Authorized]: "authorized",
  [PaymentStatusCode.Deposited]: "deposited",
  [PaymentStatusCode.Reversed]: "reversed",
  [PaymentStatusCode.Refunded]: "refunded",
  [PaymentStatusCode.PartiallyRefunded]: "partiallyrefunded",
  [PaymentStatusCode.Declined]: "declined",
  [PaymentStatusCode.Failed]: "failed",
};

const normalizeStatus = (status: PaymentStatusValue): string => {
  if (typeof status === "number") {
    return STATUS_NAME_BY_CODE[status as PaymentStatusCode] ?? String(status);
  }
  return status.trim().toLowerCase();
};

const TERMINAL_FAILURE_STATUS_NAMES: readonly string[] = [
  "declined",
  "failed",
  "reversed",
] as const;

export const isTerminalFailure = (status: PaymentStatusValue): boolean =>
  TERMINAL_FAILURE_STATUS_NAMES.includes(normalizeStatus(status));

export type RegisterPaymentRequest = {
  orderId: string;
  language?: "en" | "hy" | "ru";
};

export type RegisterPaymentResponse = {
  paymentId: string;
  epgOrderId: string;
  formUrl: string;
};

export type GetPaymentStatusResponse = {
  paymentId: string;
  orderId: string;
  epgOrderId: string | null;
  /** Numeric enum or lowercase name (e.g. 7 or `"declined"`). */
  status: PaymentStatusValue;
  epgStatusCode: number | null;
  isSuccessful: boolean;
  amountMinor: number;
  currency: string;
  errorCode: number | null;
  errorMessage: string | null;
};
