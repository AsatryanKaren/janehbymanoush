import { useTranslation } from "react-i18next";

/**
 * Admin panel is English-only. Always resolves `admin.*` (and nested `t()` calls)
 * from `en.json` only — do not add `admin` keys to `ru.json` or `hy.json`.
 * Use this hook instead of `useTranslation()` in admin pages.
 */
const ADMIN_LANG = "en" as const;

export const useAdminTranslation = () => {
  const { t } = useTranslation(undefined, { lng: ADMIN_LANG });
  return { t, language: ADMIN_LANG };
};
