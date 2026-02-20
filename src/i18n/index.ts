import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import hy from "./locales/hy.json";

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ru", label: "РУ" },
  { code: "hy", label: "ՀՅ" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      hy: { translation: hy },
    },
    lng: "hy",
    fallbackLng: "hy",
    supportedLngs: ["en", "ru", "hy"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

export default i18n;
