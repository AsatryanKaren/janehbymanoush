/**
 * Contact page assets – placeholder URLs; replace with real studio image and map link.
 */

/** Business email – used for display and Gmail compose link */
export const CONTACT_EMAIL = "hello@janehbymanoush.com";

/** Open Gmail compose with our address pre-filled (opens in new tab) */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(CONTACT_EMAIL)}`;

/** Business phone for tel: links (digits only, with +) */
export const CONTACT_PHONE_TEL = "+1234567890";

export const CONTACT_IMAGES = {
  studio:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
} as const;

/** Google Maps embed URL for Contact page (Rio Mall / studio, Yerevan) */
export const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Rio+Mall,+Papazyan+8,+Yerevan,+Armenia&output=embed";
