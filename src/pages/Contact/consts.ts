/**
 * Contact page assets – placeholder URLs; replace with real studio image and map link.
 */

import { CF_CONTACT_STUDIO } from "src/consts/gallery";
import { CONTACT_EMAIL, GMAIL_COMPOSE_URL } from "src/consts/contact";

export { CONTACT_EMAIL, GMAIL_COMPOSE_URL };

/** Business phone for tel: links (digits only, with +) */
export const CONTACT_PHONE_TEL = "+374 99 080053";

export const CONTACT_IMAGES = {
  studio: CF_CONTACT_STUDIO,
} as const;

/** Google Maps embed URL for Contact page (Rio Mall / studio, Yerevan) */
export const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Rio+Mall,+Papazyan+8,+Yerevan,+Armenia&output=embed";
