/** Business email – display, forms, and Gmail compose links (single source of truth) */
export const CONTACT_EMAIL = "janebymanoushh@gmail.com";

/** Open Gmail compose with our address pre-filled (opens in new tab) */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(CONTACT_EMAIL)}`;
