/** Filenames in `public/legal/` — must match on disk exactly. */
const PRIVACY_PDF_BY_LANG = {
  en: "Privacy Policy.pdf",
  ru: "Политика конфиденциальности.pdf",
  hy: "Գաղտնիության քաղաքականություն.pdf",
} as const;

type PrivacyLang = keyof typeof PRIVACY_PDF_BY_LANG;

const PRIVACY_LANG_CODES = Object.keys(PRIVACY_PDF_BY_LANG) as PrivacyLang[];

/**
 * Public URL for the privacy policy PDF for the active UI language.
 * Unknown codes fall back to Armenian (`hy`). Path is encoded for spaces / Unicode.
 */
export const getPrivacyPolicyPdfHref = (language: string): string => {
  // `i18n.language` may come in formats like `ru-RU` or `ru_RU`, and Armenian
  // may sometimes be provided as `am` instead of `hy`.
  const code = language.split(/[-_]/)[0] ?? "hy";
  const mapped = code === "am" ? "hy" : code;
  const normalized = (PRIVACY_LANG_CODES as readonly string[]).includes(mapped)
    ? (mapped as PrivacyLang)
    : "hy";
  const fileName = PRIVACY_PDF_BY_LANG[normalized];
  // Use `BASE_URL` so the app works when hosted under a sub-path in production.
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  return `${baseUrl}legal/${encodeURIComponent(fileName)}`;
};

const TERMS_PDF_BY_LANG = {
  en: "Terms and Conditions.pdf",
  ru: "Положения и условия.pdf",
  hy: "Ընդհանուր_դրույթները_ու_պայմանները.pdf",
} as const;

type TermsLang = keyof typeof TERMS_PDF_BY_LANG;

const TERMS_LANG_CODES = Object.keys(TERMS_PDF_BY_LANG) as TermsLang[];

export const getTermsAndConditionsPdfHref = (language: string): string => {
  const code = language.split(/[-_]/)[0] ?? "hy";
  const mapped = code === "am" ? "hy" : code;

  const normalized = (TERMS_LANG_CODES as readonly string[]).includes(mapped)
    ? (mapped as TermsLang)
    : "hy";

  const fileName = TERMS_PDF_BY_LANG[normalized];
  const baseUrl = import.meta.env.BASE_URL ?? "/";

  // Terms PDFs are stored in `public/terms/` (so URLs look like `/terms/<file>.pdf`).
  return `${baseUrl}terms/${encodeURIComponent(fileName)}`;
};
