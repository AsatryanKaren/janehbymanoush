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

/** Catalog sidebar: max width (px) at which collections list can collapse on mobile */
export const MOBILE_CATALOG_SIDEBAR_MAX_WIDTH_PX = 768;

/** How many top-level collections show before "Show more" on mobile sidebar */
export const MOBILE_CATALOG_COLLECTIONS_INITIAL = 5;

/** URL query key for catalog pagination (storefront /catalog, /women, …) */
export const CATALOG_PAGE_URL_PARAM = "page";

export const parseCatalogPageFromSearchParams = (params: URLSearchParams): number => {
  const raw = params.get(CATALOG_PAGE_URL_PARAM);
  if (raw == null || raw === "") return 1;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
};

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
