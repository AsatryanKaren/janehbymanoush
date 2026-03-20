import type { CartItem } from "src/types/cart";
import { CART_STORAGE_KEY } from "src/types/cart";

const isCartItem = (x: unknown): x is CartItem =>
  Boolean(
    x &&
      typeof x === "object" &&
      typeof (x as CartItem).id === "string" &&
      typeof (x as CartItem).price === "number" &&
      typeof (x as CartItem).quantity === "number",
  );

export const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};
