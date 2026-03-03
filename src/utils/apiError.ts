/**
 * Shape of 400 validation (and similar) error response from the API.
 * Example: { "code": "VALIDATION_ERROR", "message": "Maximum 10 product images allowed...", "details": [] }
 */
export type ApiErrorBody = {
  code?: string;
  message?: string;
  details?: unknown[];
};

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === "object" && value !== null && "message" in value;
}

/**
 * Extracts the error message from an API error (e.g. axios 400 response).
 * Returns response.data.message if present, otherwise undefined.
 */
export function getApiErrorMessage(error: unknown): string | undefined {
  if (error == null) return undefined;
  const data =
    typeof error === "object" &&
    "response" in error &&
    error.response != null &&
    typeof error.response === "object" &&
    "data" in error.response
      ? (error.response as { data?: unknown }).data
      : undefined;
  if (isApiErrorBody(data) && typeof data.message === "string") {
    return data.message;
  }
  return undefined;
}
