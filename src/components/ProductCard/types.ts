import type { Product } from "src/types/product";

export type ProductCardProps = {
  product: Product;
  /** Compact: show only category, collection, price (e.g. Best Sellers) */
  variant?: "default" | "compact";
  /**
   * When set (catalog listing), product URL includes a safe `from` param so breadcrumbs
   * and browser history can return to this path + query (e.g. /women?page=5).
   */
  catalogReturnLocation?: string;
};
