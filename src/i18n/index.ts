import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import hy from "./locales/hy.json";

/** Persisted choice; do not set `lng` in init or it overrides detection. */
export const I18N_STORAGE_KEY = "janeh.language" as const;

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ru", label: "РУ" },
  { code: "hy", label: "ՀՅ" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

const supportedLngs = ["en", "ru", "hy"] as const;

const migrateLegacyLanguageStorage = (): void => {
  if (typeof localStorage === "undefined") {
    return;
  }
  if (localStorage.getItem(I18N_STORAGE_KEY)) {
    return;
  }
  const legacy = localStorage.getItem("i18nextLng");
  if (!legacy) {
    return;
  }
  const code = legacy.split("-")[0] ?? legacy;
  if (!(supportedLngs as readonly string[]).includes(code)) {
    return;
  }
  localStorage.setItem(I18N_STORAGE_KEY, code);
};

migrateLegacyLanguageStorage();

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      hy: { translation: hy },
    },
    fallbackLng: "hy",
    supportedLngs: [...supportedLngs],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: I18N_STORAGE_KEY,
    },
  })
  .then(() => {
    document.documentElement.setAttribute("lang", i18n.language);
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

export default i18n;
