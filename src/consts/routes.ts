export const ROUTES = {
  HOME: "/",
  WOMEN: "/women",
  MEN: "/men",
  PRODUCT: "/products/:slug",
  ABOUT: "/about",
  CONTACT: "/contact",

  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCT_EDIT: "/admin/products/:id",
  ADMIN_ORDERS: "/admin/orders",
} as const;

export const buildProductPath = (slug: string): string =>
  `/products/${slug}`;

export const buildAdminProductEditPath = (id: string): string =>
  `/admin/products/${id}`;
