import { http } from "src/api/http";
import type {
  GetPaymentStatusResponse,
  RegisterPaymentRequest,
  RegisterPaymentResponse,
} from "src/types/payments";

const REGISTER_PATH = "/v1/payments/epg/register";
const STATUS_PATH = "/v1/payments/epg/status";

export const paymentsApi = {
  /** POST /v1/payments/epg/register — create EPG session for an existing online order. */
  register: (body: RegisterPaymentRequest): Promise<RegisterPaymentResponse> =>
    http<RegisterPaymentResponse>(REGISTER_PATH, { method: "POST", body }),

  /**
   * GET /v1/payments/epg/status/{epgOrderId} — poll outcome.
   * `epgOrderId` is the provider-side string from `register`; URL-encoded for safety.
   */
  getStatus: (epgOrderId: string): Promise<GetPaymentStatusResponse> =>
    http<GetPaymentStatusResponse>(
      `${STATUS_PATH}/${encodeURIComponent(epgOrderId)}`,
    ),
};
