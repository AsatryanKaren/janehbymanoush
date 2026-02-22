import { useTranslation } from "react-i18next";

/** Admin panel uses English only. Use this instead of useTranslation() in admin. */
const ADMIN_LANG = "en" as const;

export const useAdminTranslation = () => {
  const { t } = useTranslation(undefined, { lng: ADMIN_LANG });
  return { t, language: ADMIN_LANG };
};
