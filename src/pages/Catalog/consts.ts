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

/** URL query key for catalog product search (mirrors list filter in the address bar) */
export const CATALOG_SEARCH_URL_PARAM = "q";

export const parseCatalogPageFromSearchParams = (params: URLSearchParams): number => {
  const raw = params.get(CATALOG_PAGE_URL_PARAM);
  if (raw == null || raw === "") return 1;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
};

export const parseCatalogSearchFromSearchParams = (params: URLSearchParams): string =>
  params.get(CATALOG_SEARCH_URL_PARAM)?.trim() ?? "";

/** Stored in `filterValue` state and matched against collection id. */
export const CATALOG_FILTER_COLLECTION_PREFIX = "col-" as const;

/** Stored in `filterValue` state and matched against category id. */
export const CATALOG_FILTER_CATEGORY_PREFIX = "cat-" as const;

export const CATALOG_PRICE_MIN = 0;
export const CATALOG_PRICE_MAX = 500_000;

/** URL query keys for catalog price range (AMD); omitted when the full default range is active */
export const CATALOG_PRICE_MIN_URL_PARAM = "minPrice";
export const CATALOG_PRICE_MAX_URL_PARAM = "maxPrice";

const parseCatalogPriceBound = (
  raw: string | null,
  fallback: number,
): number => {
  if (raw == null || raw === "") return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(CATALOG_PRICE_MAX, Math.max(CATALOG_PRICE_MIN, n));
};

export const parseCatalogPriceRangeFromSearchParams = (
  params: URLSearchParams,
): [number, number] => {
  const rawMin = params.get(CATALOG_PRICE_MIN_URL_PARAM);
  const rawMax = params.get(CATALOG_PRICE_MAX_URL_PARAM);
  if (rawMin == null && rawMax == null) {
    return [CATALOG_PRICE_MIN, CATALOG_PRICE_MAX];
  }
  let min = parseCatalogPriceBound(rawMin, CATALOG_PRICE_MIN);
  let max = parseCatalogPriceBound(rawMax, CATALOG_PRICE_MAX);
  if (min > max) {
    const t = min;
    min = max;
    max = t;
  }
  return [min, max];
};

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
