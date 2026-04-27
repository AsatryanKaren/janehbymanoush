const DEFAULT_ADMIN_PRODUCTS_PAGE_SIZE = 12;

export const ADMIN_PRODUCTS_PAGE_PARAM = "page";
export const ADMIN_PRODUCTS_PAGE_SIZE_PARAM = "pageSize";
/** On product view/edit/new URLs: where to return on the admin products list */
export const ADMIN_PRODUCT_LIST_PAGE_PARAM = "listPage";
export const ADMIN_PRODUCT_LIST_PAGE_SIZE_PARAM = "listPageSize";

const parsePositiveIntParam = (raw: string | null, fallback: number): number => {
  if (raw == null || raw === "") return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 1 ? n : fallback;
};

export type AdminProductListPagination = {
  page: number;
  pageSize: number;
};

export const parseAdminProductsListQuery = (params: URLSearchParams): AdminProductListPagination => ({
  page: parsePositiveIntParam(params.get(ADMIN_PRODUCTS_PAGE_PARAM), 1),
  pageSize: parsePositiveIntParam(
    params.get(ADMIN_PRODUCTS_PAGE_SIZE_PARAM),
    DEFAULT_ADMIN_PRODUCTS_PAGE_SIZE,
  ),
});

/** Reads list return params from product view/edit/new URLs */
export const parseAdminProductListReturnQuery = (
  params: URLSearchParams,
): AdminProductListPagination | null => {
  const lp = params.get(ADMIN_PRODUCT_LIST_PAGE_PARAM);
  const ls = params.get(ADMIN_PRODUCT_LIST_PAGE_SIZE_PARAM);
  if (lp == null && ls == null) return null;
  return {
    page: parsePositiveIntParam(lp, 1),
    pageSize: parsePositiveIntParam(ls, DEFAULT_ADMIN_PRODUCTS_PAGE_SIZE),
  };
};

const appendAdminProductListReturnQuery = (
  pathWithOptionalQuery: string,
  list: AdminProductListPagination,
): string => {
  const [path, existingQuery = ""] = pathWithOptionalQuery.split("?", 2);
  const sp = new URLSearchParams(existingQuery);
  sp.set(ADMIN_PRODUCT_LIST_PAGE_PARAM, String(list.page));
  sp.set(ADMIN_PRODUCT_LIST_PAGE_SIZE_PARAM, String(list.pageSize));
  return `${path}?${sp.toString()}`;
};

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  WOMEN: "/women",
  MEN: "/men",
  UNISEX: "/unisex",
  NEW: "/new",
  PRODUCT: "/products/:slug",
  CHECKOUT: "/checkout",
  ABOUT: "/about",
  CONTACT: "/contact",
  RING_SIZE_GUIDE: "/ring-size-guide",
  SHIPPING: "/shipping",
  RETURNS: "/returns",
  CARE: "/care",
  GIFT_CARDS: "/gift-cards",

  ADMIN_LOGIN: "/admin/login",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCT_VIEW: "/admin/products/:id",
  ADMIN_PRODUCT_EDIT: "/admin/products/:id/edit",
  ADMIN_PRODUCT_NEW: "/admin/products/new",
  ADMIN_COLLECTIONS: "/admin/collections",
  ADMIN_COLLECTION_EDIT: "/admin/collections/:id/edit",
  ADMIN_COLLECTION_NEW: "/admin/collections/new",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_CATEGORY_EDIT: "/admin/categories/:id/edit",
  ADMIN_CATEGORY_NEW: "/admin/categories/new",
  ADMIN_MASTERS: "/admin/masters",
  ADMIN_MASTERS_NEW: "/admin/masters/new",
  ADMIN_MASTERS_EDIT: "/admin/masters/:id/edit",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_BESTSELLERS: "/admin/bestsellers",
  ADMIN_LOGS: "/admin/logs",
  ADMIN_BANNER_CONTENT: "/admin/banner-content",
} as const;

export const buildAdminProductsListPath = (page: number, pageSize: number): string => {
  const p = new URLSearchParams();
  if (page > 1) p.set(ADMIN_PRODUCTS_PAGE_PARAM, String(page));
  if (pageSize !== DEFAULT_ADMIN_PRODUCTS_PAGE_SIZE) {
    p.set(ADMIN_PRODUCTS_PAGE_SIZE_PARAM, String(pageSize));
  }
  const q = p.toString();
  return q ? `${ROUTES.ADMIN_PRODUCTS}?${q}` : ROUTES.ADMIN_PRODUCTS;
};

export const buildProductPath = (slug: string): string =>
  `/products/${slug}`;

/** Storefront product page: safe return path for catalog breadcrumb (pathname + optional ?query) */
export const PRODUCT_CATALOG_RETURN_PARAM = "from";

const STOREFRONT_CATALOG_SECTION_PATHS: readonly string[] = [
  ROUTES.CATALOG,
  ROUTES.WOMEN,
  ROUTES.MEN,
  ROUTES.UNISEX,
  ROUTES.NEW,
] as const;

/**
 * Validates `from` query on /products/:slug — only same-site catalog section paths allowed.
 * Returns pathname+search for use in Link `to`, or null if missing/invalid.
 */
export const parseSafeCatalogReturnPath = (raw: string | null): string | null => {
  if (raw == null || raw.trim() === "") return null;
  let decoded = raw.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return null;
  }
  if (!decoded.startsWith("/")) return null;
  if (decoded.startsWith("//")) return null;
  const q = decoded.indexOf("?");
  const pathPart = q >= 0 ? decoded.slice(0, q) : decoded;
  if (!STOREFRONT_CATALOG_SECTION_PATHS.includes(pathPart)) return null;
  return decoded;
};

/** Product link from catalog listing — preserves return URL for breadcrumb / history context */
export const buildProductPathWithCatalogReturn = (
  slug: string,
  catalogLocation: string,
): string => {
  const base = buildProductPath(slug);
  const sp = new URLSearchParams();
  sp.set(PRODUCT_CATALOG_RETURN_PARAM, catalogLocation);
  return `${base}?${sp.toString()}`;
};

export const buildAdminProductViewPath = (
  id: string,
  list?: AdminProductListPagination,
): string => {
  const base = `/admin/products/${id}`;
  if (!list) return base;
  return appendAdminProductListReturnQuery(base, list);
};

export const buildAdminProductEditPath = (
  id: string,
  list?: AdminProductListPagination,
): string => {
  const base = `/admin/products/${id}/edit`;
  if (!list) return base;
  return appendAdminProductListReturnQuery(base, list);
};

/** Open create product form with fields prefilled from an existing product (query param read by admin UI). */
export const buildAdminProductDuplicatePath = (
  sourceProductId: string,
  list?: AdminProductListPagination,
): string => {
  const base = `${ROUTES.ADMIN_PRODUCT_NEW}?copyFrom=${encodeURIComponent(sourceProductId)}`;
  if (!list) return base;
  return appendAdminProductListReturnQuery(base, list);
};

export const buildAdminCollectionEditPath = (id: string): string =>
  `/admin/collections/${id}/edit`;

export const buildAdminCategoryEditPath = (id: string): string =>
  `/admin/categories/${id}/edit`;

export const buildAdminMasterEditPath = (id: string): string =>
  `/admin/masters/${id}/edit`;

export const buildAdminOrderPath = (id: string): string =>
  `/admin/order/${id}`;
