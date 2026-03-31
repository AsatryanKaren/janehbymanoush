import type { TFunction } from "i18next";
import type { CartItem } from "src/types/cart";
import type { CreateOrderLineItem, CreateOrderRequest } from "src/types/order";
import { isRingItem } from "src/utils/isRingItem";
import {
  checkoutCountryValueToShippingCountry,
  packagingFormValuesToFlags,
  pickupStoreValueToStoreAddress,
} from "src/utils/createOrderPayload";
import type { CheckoutFormValues } from "./types";

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

const ringItemsWithSize = (items: CartItem[]): CartItem[] =>
  items.filter(
    (item) =>
      isRingItem(item) &&
      item.ringSize != null &&
      typeof item.ringSize === "number",
  );

const ringSizesMessageFragment = (
  items: CartItem[],
  t: TFunction,
): string | null => {
  const rings = ringItemsWithSize(items);
  if (rings.length <= 1) {
    return null;
  }
  const detail = rings
    .map((item) => {
      const label =
        item.nameEn?.trim() ||
        item.nameHy?.trim() ||
        item.nameRu?.trim() ||
        item.id;
      return `${label}: ${item.ringSize}`;
    })
    .join("; ");
  return t("checkout.ringSizesOrderNote", { detail });
};

export const buildCheckoutCreateOrderRequest = (
  items: CartItem[],
  values: CheckoutFormValues,
  t: TFunction,
): CreateOrderRequest => {
  const isPickup = values.deliveryMethod === "pickup";
  const messageParts = [values.message?.trim()].filter(Boolean) as string[];

  if (!isPickup && values.address?.trim()) {
    messageParts.push(`${t("checkout.address")}: ${values.address.trim()}`);
  }

  const ringNote = ringSizesMessageFragment(items, t);
  if (ringNote) {
    messageParts.push(ringNote);
  }

  const customerName = values.name?.trim() || null;
  const packaging = packagingFormValuesToFlags(values.packaging ?? []);

  const base: CreateOrderRequest = {
    items: items.map((item) => {
      const line: CreateOrderLineItem = {
        productId: item.id,
        count: item.quantity,
      };
      if (
        isRingItem(item) &&
        item.ringSize != null &&
        typeof item.ringSize === "number"
      ) {
        line.ringSize = item.ringSize;
      }
      return line;
    }),
    customerName,
    phone: values.phone?.trim() || null,
    email: values.email?.trim() || null,
    message: messageParts.length > 0 ? messageParts.join(" | ") : null,
    packaging,
  };

  if (isPickup) {
    const storeAddress = pickupStoreValueToStoreAddress(values.pickupStore);
    if (storeAddress != null) {
      base.storeAddress = storeAddress;
    }
    return base;
  }

  base.shippingCountry = checkoutCountryValueToShippingCountry(values.country);
  return base;
};
