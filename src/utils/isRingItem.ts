import type { CartItem } from "src/types/cart";

/** categoryName value for rings from API (Armenian: Մատանի). */
const RING_CATEGORY_NAME = "Մատանի";

/** `ring` / `rings` as a whole token in a lowercased slug or label (spaces, `-`, `_`). */
const hasRingToken = (lower: string): boolean =>
  /(^|[\s_-])rings?($|[\s_-])/.test(lower);

/**
 * Returns true if categoryName indicates a ring. Use for product page.
 */
export const isRingCategoryName = (
  categoryName: string | null | undefined,
): boolean => {
  const name = (categoryName ?? "").trim();
  if (name === "") return false;
  if (name === RING_CATEGORY_NAME || name === "մատանի") return true;
  return hasRingToken(name.toLowerCase());
};

type CategoryFieldsForRing = {
  category?: string | null;
  categoryName?: string | null;
  categoryNameHy?: string | null;
  categoryNameEn?: string | null;
  categoryNameRu?: string | null;
};

/**
 * Product / list item: ring category from slug or any localized category label.
 */
export const isRingCategoryFromProduct = (
  product: CategoryFieldsForRing,
): boolean => {
  if (isRingCategoryName(product.categoryName)) return true;
  if (isRingCategoryName(product.categoryNameHy)) return true;
  if (isRingCategoryName(product.categoryNameEn)) return true;
  if (isRingCategoryName(product.categoryNameRu)) return true;
  const cat = (product.category ?? "").trim().toLowerCase();
  return (
    cat === "ring" ||
    cat === "rings" ||
    cat === "մատանի" ||
    cat === RING_CATEGORY_NAME.toLowerCase() ||
    hasRingToken(cat)
  );
};

/**
 * Returns true if the cart item is a ring. Checks both categoryName and category
 * (API may send either, e.g. categoryName "Մատանի" or category "rings").
 */
export const isRingItem = (item: CartItem): boolean =>
  isRingCategoryFromProduct(item);

