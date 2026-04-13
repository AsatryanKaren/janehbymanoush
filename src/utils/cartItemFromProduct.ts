import type { CartItem } from "src/types/cart";
import type { ProductImage } from "src/types/product";

type ProductLike = {
  id: string;
  slug?: string | null;
  nameEn?: string | null;
  nameHy?: string | null;
  nameRu?: string | null;
  price?: number;
  mainImageUrl?: string | null;
  images?: ProductImage[] | null;
  descriptionEn?: string | null;
  descriptionHy?: string | null;
  descriptionRu?: string | null;
  category?: string | null;
  categoryName?: string | null;
  categoryNameHy?: string | null;
  categoryNameEn?: string | null;
  categoryNameRu?: string | null;
};

/** Prefer API `images[]` entry with `isMain: true`; else `mainImageUrl` (e.g. catalog cards). */
const resolveMainImageUrlForCart = (product: ProductLike): string | null => {
  const fromFlaggedMain = product.images?.find((img) => img.isMain)?.url;
  if (fromFlaggedMain) return fromFlaggedMain;
  return product.mainImageUrl ?? null;
};

/**
 * Build cart item payload from a product (card or details) for use with addItem.
 */
export function cartItemFromProduct(product: ProductLike): Omit<CartItem, "quantity"> {
  return {
    id: product.id,
    slug: product.slug ?? null,
    nameEn: product.nameEn ?? null,
    nameHy: product.nameHy ?? null,
    nameRu: product.nameRu ?? null,
    price: product.price ?? 0,
    mainImageUrl: resolveMainImageUrlForCart(product),
    descriptionEn: product.descriptionEn ?? null,
    descriptionHy: product.descriptionHy ?? null,
    descriptionRu: product.descriptionRu ?? null,
    category: product.category ?? null,
    categoryName: product.categoryName ?? null,
    categoryNameHy: product.categoryNameHy ?? null,
    categoryNameEn: product.categoryNameEn ?? null,
    categoryNameRu: product.categoryNameRu ?? null,
  };
}
