import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CartItem } from "src/types/cart";
import type { CartContextValue, CartProviderProps } from "./types";
import { loadCart, saveCart } from "./utils";

const CartContext = createContext<CartContextValue | null>(null);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        const q = Math.max(1, quantity);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + q,
                  ...(item.ringSize !== undefined && {
                    ringSize: item.ringSize ?? null,
                    ringSizeIsCustom: item.ringSizeIsCustom ?? false,
                  }),
                }
              : i,
          );
        }
        return [...prev, { ...item, quantity: q }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.max(0, quantity);
    setItems((prev) =>
      q === 0
        ? prev.filter((i) => i.id !== productId)
        : prev.map((i) => (i.id === productId ? { ...i, quantity: q } : i)),
    );
  }, []);

  const updateRingSize = useCallback(
    (
      productId: string,
      ringSize: number | null,
      ringSizeIsCustom: boolean,
    ) => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === productId
            ? { ...i, ringSize, ringSizeIsCustom }
            : i,
        ),
      );
    },
    [],
  );

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const value: CartContextValue = {
    items,
    totalCount,
    addItem,
    removeItem,
    updateQuantity,
    updateRingSize,
    openSidebar,
    setOpenSidebar,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};

export default CartProvider;
