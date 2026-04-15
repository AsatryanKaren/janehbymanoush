import { ROUTES } from "src/consts/routes";

export const CATEGORY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "women",
  [ROUTES.MEN]: "men",
  [ROUTES.UNISEX]: "unisex",
};

export const TITLE_KEY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "catalog.womenCollection",
  [ROUTES.MEN]: "catalog.menCollection",
  [ROUTES.UNISEX]: "catalog.unisexCollection",
  [ROUTES.NEW]: "catalog.newArrivals",
};

export const CATALOG_PAGE_SIZE = 12;

/** Stored in `filterValue` state and matched against collection id. */
export const CATALOG_FILTER_COLLECTION_PREFIX = "col-" as const;

/** Stored in `filterValue` state and matched against category id. */
export const CATALOG_FILTER_CATEGORY_PREFIX = "cat-" as const;

export const CATALOG_PRICE_MIN = 0;
export const CATALOG_PRICE_MAX = 500_000;

export const isCatalogDefaultPriceRange = (range: [number, number]): boolean =>
  range[0] === CATALOG_PRICE_MIN && range[1] === CATALOG_PRICE_MAX;

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
