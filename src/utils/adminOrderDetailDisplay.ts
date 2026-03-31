import type { TFunction } from "i18next";
import {
  PackagingOptionFlag,
  ShippingCountry,
  StoreAddress,
} from "src/types/order";

const SHIPPING_COUNTRY_STRING_KEYS: Record<string, string> = {
  armenia: "checkout.countryArmenia",
  russia: "checkout.countryRussia",
  usa: "checkout.countryUSA",
};

const PACKAGING_TOKEN_KEYS: Record<string, string> = {
  bag: "checkout.packaging.bag",
  box: "checkout.packaging.box",
  jewelrybox: "checkout.packaging.jewelryBox",
  smalljewelrybox: "checkout.packaging.jewelryBox",
};

const isEmptySentinel = (s: string): boolean =>
  s === "" || s.toLowerCase() === "null" || s.toLowerCase() === "undefined";

/** True when API sent a shipping country (hide row in admin when false). */
export const adminOrderHasShippingCountry = (
  value: number | string | null | undefined,
): boolean => {
  if (value == null) return false;
  if (typeof value === "number" && Number.isFinite(value)) return true;
  if (typeof value === "string") {
    const key = value.trim().toLowerCase();
    return key.length > 0 && !isEmptySentinel(key);
  }
  return false;
};

/** True when API sent a pickup store (hide row in admin when false). */
export const adminOrderHasPickupStore = (
  value: number | string | null | undefined,
): boolean => {
  if (value == null) return false;
  if (typeof value === "number" && Number.isFinite(value)) return true;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase().replace(/_/g, "");
    return normalized.length > 0 && !isEmptySentinel(normalized);
  }
  return false;
};

export type AdminOrderFulfillmentType = "pickup" | "shipping" | "unknown";

/**
 * Pickup when a store is set; otherwise shipping when a country is set.
 * Pickup wins if both were ever sent by mistake.
 */
export const getAdminOrderFulfillmentType = (order: {
  shippingCountry?: number | string | null;
  storeAddress?: number | string | null;
}): AdminOrderFulfillmentType => {
  if (adminOrderHasPickupStore(order.storeAddress)) return "pickup";
  if (adminOrderHasShippingCountry(order.shippingCountry)) return "shipping";
  return "unknown";
};

/** Shipping country: API may send enum number or string (e.g. `"usa"`). */
export const formatAdminShippingCountry = (
  value: number | string | null | undefined,
  t: TFunction,
): string => {
  if (value == null) return "—";
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value === ShippingCountry.Armenia) return t("checkout.countryArmenia");
    if (value === ShippingCountry.Russia) return t("checkout.countryRussia");
    if (value === ShippingCountry.Usa) return t("checkout.countryUSA");
    return String(value);
  }
  if (typeof value === "string") {
    const key = value.trim().toLowerCase();
    if (isEmptySentinel(key)) return "—";
    const labelKey = SHIPPING_COUNTRY_STRING_KEYS[key];
    return labelKey ? t(labelKey) : value.trim();
  }
  return "—";
};

/** Pickup store: API may send enum number or string (e.g. `"rioMall"`). */
export const formatAdminStoreAddress = (
  value: number | string | null | undefined,
  t: TFunction,
): string => {
  if (value == null) return "—";
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value === StoreAddress.RioMall) return t("checkout.store.rioMall");
    return String(value);
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase().replace(/_/g, "");
    if (isEmptySentinel(normalized)) return "—";
    if (normalized === "riomall") return t("checkout.store.rioMall");
    return value.trim();
  }
  return "—";
};

/** Packaging: API may send flag bits (number) or comma-separated names (string). */
export const formatAdminPackaging = (
  value: number | string | null | undefined,
  t: TFunction,
): string => {
  if (value == null) return "—";
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value === PackagingOptionFlag.None) return "—";
    const parts: string[] = [];
    if (value & PackagingOptionFlag.Bag) {
      parts.push(t("checkout.packaging.bag"));
    }
    if (value & PackagingOptionFlag.Box) {
      parts.push(t("checkout.packaging.box"));
    }
    if (value & PackagingOptionFlag.SmallJewelryBox) {
      parts.push(t("checkout.packaging.jewelryBox"));
    }
    return parts.length > 0 ? parts.join(", ") : String(value);
  }
  if (typeof value === "string") {
    const s = value.trim();
    if (isEmptySentinel(s)) return "—";
    const labels = s
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .map((token) => {
        const k = token.toLowerCase().replace(/\s+/g, "");
        const labelKey = PACKAGING_TOKEN_KEYS[k];
        return labelKey ? t(labelKey) : token;
      });
    return labels.length > 0 ? labels.join(", ") : "—";
  }
  return "—";
};

/**
 * Line-item ring sizes when API sends `ringSizes` (single number or per-unit list).
 * Returns `null` when absent or empty so the UI can hide the row.
 */
export const formatAdminLineItemRingSizes = (
  raw: number[] | number | null | undefined,
): string | null => {
  if (raw == null) return null;
  if (typeof raw === "number") {
    return Number.isFinite(raw) ? String(raw) : null;
  }
  if (Array.isArray(raw)) {
    const parts = raw.filter(
      (x): x is number => typeof x === "number" && Number.isFinite(x),
    );
    return parts.length > 0 ? parts.map(String).join(", ") : null;
  }
  return null;
};
