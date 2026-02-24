import { ROUTES } from "src/consts/routes";

export const CATEGORY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "women",
  [ROUTES.MEN]: "men",
};

export const TITLE_KEY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "catalog.womenCollection",
  [ROUTES.MEN]: "catalog.menCollection",
  [ROUTES.NEW]: "catalog.newArrivals",
};

export type SortValue = "price_asc" | "price_desc" | "date_desc" | "date_asc";

export const SORT_PARAMS: Record<
  SortValue,
  { SortBy: string; SortOrder: string }
> = {
  price_asc: { SortBy: "Price", SortOrder: "Asc" },
  price_desc: { SortBy: "Price", SortOrder: "Desc" },
  date_desc: { SortBy: "CreatedAt", SortOrder: "Desc" },
  date_asc: { SortBy: "CreatedAt", SortOrder: "Asc" },
};
