import type { Product } from "src/types/product";

export interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
}
