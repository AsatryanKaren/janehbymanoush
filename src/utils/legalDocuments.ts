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
  const code = language.split("-")[0] ?? "hy";
  const normalized = (PRIVACY_LANG_CODES as readonly string[]).includes(code)
    ? (code as PrivacyLang)
    : "hy";
  const fileName = PRIVACY_PDF_BY_LANG[normalized];
  return `/legal/${encodeURIComponent(fileName)}`;
};
