/** Single item in shopping cart (stored in localStorage). */
export type CartItem = {
  id: string;
  slug?: string | null;
  nameEn?: string | null;
  nameHy?: string | null;
  nameRu?: string | null;
  price: number;
  mainImageUrl?: string | null;
  quantity: number;
  descriptionEn?: string | null;
  descriptionHy?: string | null;
  descriptionRu?: string | null;
  /** Product category id/slug (e.g. "rings") to show ring size for rings. */
  category?: string | null;
  /** Product category display name (e.g. "Rings"). */
  categoryName?: string | null;
  /** Selected ring size when product is a ring. */
  ringSize?: number | null;
  ringSizeIsCustom?: boolean;
};

export const CART_STORAGE_KEY = "janeh_cart";
