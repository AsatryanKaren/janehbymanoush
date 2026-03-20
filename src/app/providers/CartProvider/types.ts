import type { CartItem } from "src/types/cart";

export type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateRingSize: (
    productId: string,
    ringSize: number | null,
    ringSizeIsCustom: boolean,
  ) => void;
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
};

export type CartProviderProps = {
  children: React.ReactNode;
};
