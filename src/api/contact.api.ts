import { http } from "src/api/http";
import type { ContactUsRequest } from "src/types/contact";

const CONTACT_PATH = "/v1/contact";

/** POST /v1/contact — submit contact form (e.g. from Contact page). */
export function contactUs(request: ContactUsRequest): Promise<void> {
  return http<void>(CONTACT_PATH, {
    method: "POST",
    body: request,
  });
}
