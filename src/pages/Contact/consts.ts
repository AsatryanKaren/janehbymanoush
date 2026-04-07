/**
 * Contact page assets – placeholder URLs; replace with real studio image and map link.
 */

import { CF_CONTACT_STUDIO } from "src/consts/gallery";

/** Business email – used for display and Gmail compose link */
export const CONTACT_EMAIL = "janebymanoushh@gmail.com";

/** Open Gmail compose with our address pre-filled (opens in new tab) */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(CONTACT_EMAIL)}`;

/** Business phone for tel: links (digits only, with +) */
export const CONTACT_PHONE_TEL = "+374 99 080053";

export const CONTACT_IMAGES = {
  studio: CF_CONTACT_STUDIO,
} as const;

/** Google Maps embed URL for Contact page (Rio Mall / studio, Yerevan) */
export const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Rio+Mall,+Papazyan+8,+Yerevan,+Armenia&output=embed";
