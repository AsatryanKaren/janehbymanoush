import type { Product } from "src/types/product";

export interface ProductCardProps {
  product: Product;
  /** Compact: show only category, collection, price (e.g. Best Sellers) */
  variant?: "default" | "compact";
}
