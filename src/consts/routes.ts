export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  WOMEN: "/women",
  MEN: "/men",
  PRODUCT: "/products/:slug",
  ABOUT: "/about",
  CONTACT: "/contact",

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
  ADMIN_ORDERS: "/admin/orders",
} as const;

export const buildProductPath = (slug: string): string =>
  `/products/${slug}`;

export const buildAdminProductViewPath = (id: string): string =>
  `/admin/products/${id}`;

export const buildAdminProductEditPath = (id: string): string =>
  `/admin/products/${id}/edit`;

export const buildAdminCollectionEditPath = (id: string): string =>
  `/admin/collections/${id}/edit`;

export const buildAdminCategoryEditPath = (id: string): string =>
  `/admin/categories/${id}/edit`;
