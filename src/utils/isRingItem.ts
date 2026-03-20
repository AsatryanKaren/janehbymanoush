import type { CartItem } from "src/types/cart";

/** categoryName value for rings from API (Armenian: Մատանի). */
const RING_CATEGORY_NAME = "Մատանի";

/**
 * Returns true if categoryName indicates a ring. Use for product page.
 */
export const isRingCategoryName = (
  categoryName: string | null | undefined,
): boolean => {
  const name = (categoryName ?? "").trim();
  return name === RING_CATEGORY_NAME || name === "մատանի";
};

/**
 * Returns true if the cart item is a ring. Checks both categoryName and category
 * (API may send either, e.g. categoryName "Մատանի" or category "rings").
 */
export const isRingItem = (item: CartItem): boolean => {
  if (isRingCategoryName(item.categoryName)) return true;
  const cat = (item.category ?? "").trim().toLowerCase();
  return (
    cat === "ring" ||
    cat === "rings" ||
    cat === "մատանի" ||
    cat === RING_CATEGORY_NAME.toLowerCase()
  );
};
