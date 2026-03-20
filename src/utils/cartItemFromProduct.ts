import type { CartItem } from "src/types/cart";

type ProductLike = {
  id: string;
  slug?: string | null;
  nameEn?: string | null;
  nameHy?: string | null;
  nameRu?: string | null;
  price?: number;
  mainImageUrl?: string | null;
  descriptionEn?: string | null;
  descriptionHy?: string | null;
  descriptionRu?: string | null;
  category?: string | null;
  categoryName?: string | null;
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
    mainImageUrl: product.mainImageUrl ?? null,
    descriptionEn: product.descriptionEn ?? null,
    descriptionHy: product.descriptionHy ?? null,
    descriptionRu: product.descriptionRu ?? null,
    category: product.category ?? null,
    categoryName: product.categoryName ?? null,
  };
}
