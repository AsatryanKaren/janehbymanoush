/** ASCII filenames only — production/CDN often breaks percent-encoded non-ASCII paths. */
const PRIVACY_PDF_BY_LANG = {
  en: "privacy-en.pdf",
  ru: "privacy-ru.pdf",
  hy: "privacy-hy.pdf",
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
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  return `${baseUrl}legal/${fileName}`;
};

/** ASCII filenames only — production/CDN often breaks percent-encoded non-ASCII paths. */
const TERMS_PDF_BY_LANG = {
  en: "terms-en.pdf",
  ru: "terms-ru.pdf",
  hy: "terms-hy.pdf",
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

  // Terms PDFs are in `public/terms/` with ASCII names, e.g. `/terms/terms-hy.pdf`.
  return `${baseUrl}terms/${fileName}`;
};
