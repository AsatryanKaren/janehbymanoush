import type { CartItem } from "src/types/cart";
import { isRingItem } from "src/utils/isRingItem";

type OptionWithLabel = {
  value: string;
  labelKey: string;
};

export const hasRingsWithoutSize = (items: CartItem[]): boolean =>
  items.some(
    (item) =>
      isRingItem(item) &&
      (item.ringSize == null || typeof item.ringSize !== "number"),
  );

export const getSelectedOptionLabels = (
  selectedValues: string[],
  options: readonly OptionWithLabel[],
  translate: (key: string) => string,
): string[] =>
  selectedValues.reduce<string[]>((acc, value) => {
    const labelKey = options.find((option) => option.value === value)?.labelKey;
    if (labelKey) {
      acc.push(translate(labelKey));
    }
    return acc;
  }, []);

export const getStoreLabel = (
  storeValue: string | undefined,
  options: readonly OptionWithLabel[],
  translate: (key: string) => string,
): string => {
  const labelKey = options.find((option) => option.value === storeValue)?.labelKey;
  return labelKey ? translate(labelKey) : (storeValue ?? "");
};
