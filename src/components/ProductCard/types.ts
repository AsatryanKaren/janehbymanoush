import type { Product } from "src/types/product";

export type ProductCardProps = {
  product: Product;
  /** Compact: show only category, collection, price (e.g. Best Sellers) */
  variant?: "default" | "compact";
};
