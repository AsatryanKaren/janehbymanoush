import type { ProductImage } from "src/types/product";

export type ProductImagesProps = {
  images: ProductImage[] | null | undefined;
  mainImageUrl?: string | null;
  productName: string;
};
