import { ROUTES } from "src/consts/routes";

export const CATEGORY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "women",
  [ROUTES.MEN]: "men",
};

export const TITLE_KEY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "catalog.womenCollection",
  [ROUTES.MEN]: "catalog.menCollection",
};
