/**
 * Shape of 400 validation (and similar) error response from the API.
 * Example: { "code": "VALIDATION_ERROR", "message": "...", "details": [] }
 */
export type ApiErrorBody = {
  code?: string;
  message?: string;
  details?: unknown[];
};

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === "object" && value !== null && "message" in value;
}

/** Wrapped API envelope: { success: false, error: { message, details } } */
const messageFromResponseData = (data: unknown): string | undefined => {
  if (data == null || typeof data !== "object") return undefined;
  const o = data as Record<string, unknown>;

  const nested = o.error;
  if (nested != null && typeof nested === "object" && "message" in nested) {
    const m = (nested as { message?: unknown }).message;
    if (typeof m === "string" && m.trim()) return m.trim();
  }

  if (isApiErrorBody(data) && typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }

  return undefined;
};

const GENERIC_AXIOS_STATUS_MESSAGE = /^Request failed with status code \d+$/;

/**
 * Extracts a user-facing message from an API error (axios) or from `Error` thrown by `http()`
 * when the server returns `{ success: false, error: { message } }` on a successful HTTP response.
 */
export const getApiErrorMessage = (error: unknown): string | undefined => {
  if (error == null) return undefined;

  const data =
    typeof error === "object" &&
    "response" in error &&
    error.response != null &&
    typeof error.response === "object" &&
    "data" in error.response
      ? (error.response as { data?: unknown }).data
      : undefined;

  const fromResponse = messageFromResponseData(data);
  if (fromResponse) return fromResponse;

  if (error instanceof Error) {
    const msg = error.message.trim();
    if (
      msg &&
      msg !== "API Error" &&
      !GENERIC_AXIOS_STATUS_MESSAGE.test(msg)
    ) {
      return msg;
    }
  }

  return undefined;
};
