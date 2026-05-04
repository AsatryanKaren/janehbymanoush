import { staticUrl } from "src/consts/gallery";

/** Legacy int `packaging` bitmask (must match former `PackagingOptionFlag`). */
const LEGACY_FLAG_BAG = 1;
const LEGACY_FLAG_BOX = 2;
const LEGACY_FLAG_BAG2 = 8;
const LEGACY_FLAG_BOX2 = 16;
const LEGACY_FLAG_BOX3 = 32;

/**
 * Shared packaging enum (storefront + POST /v1/orders + admin GET).
 * Backend must use these exact lowercase snake_case strings.
 *
 * | Value              | Product (admin label in en.json) |
 * |--------------------|----------------------------------|
 * | `white_bag`        | 1 — White bag                    |
 * | `black_bag`        | 2 — Black bag                    |
 * | `white_box`        | 3 — White box                    |
 * | `white_box_janeh`  | 4 — White box + Janeh package    |
 * | `black_box`        | 5 — Black box                    |
 */
export const PACKAGING_ENUM_VALUES = [
  "white_bag",
  "black_bag",
  "white_box",
  "white_box_janeh",
  "black_box",
] as const;

export type PackagingEnum = (typeof PACKAGING_ENUM_VALUES)[number];

/** Stored / read paths only; storefront create orders always send a `PackagingEnum`. */
export type PackagingChoiceApi = PackagingEnum | "none";

/** Default packaging when the customer must choose one (first tile). */
export const DEFAULT_CHECKOUT_PACKAGING: PackagingEnum = PACKAGING_ENUM_VALUES[0];

const ENUM_SET: ReadonlySet<string> = new Set(PACKAGING_ENUM_VALUES);

const IMAGE_FILE: Record<PackagingEnum, string> = {
  white_bag: "Bag.webp",
  black_bag: "Bag 2.webp",
  white_box: "Box.webp",
  white_box_janeh: "Box 2.webp",
  black_box: "Box 3.webp",
};

/** Old storefront / API strings → current enum (for admin + migrations). */
const LEGACY_STRING_TO_ENUM: Record<string, PackagingEnum> = {
  bag: "white_bag",
  bag2: "black_bag",
  box: "white_box",
  box2: "white_box_janeh",
  box3: "black_box",
};

export const packagingImageUrl = (value: PackagingEnum): string =>
  staticUrl(IMAGE_FILE[value]);

export const isPackagingEnum = (value: string): value is PackagingEnum =>
  ENUM_SET.has(value);

export const toPackagingChoiceApi = (
  raw: string | string[] | undefined | null,
): PackagingChoiceApi => {
  if (raw == null) {
    return "none";
  }
  const key = Array.isArray(raw) ? (raw[0]?.trim() ?? "") : raw.trim();
  if (key.length === 0) {
    return "none";
  }
  const normalized = key.toLowerCase().replace(/\s+/g, "_");
  if (normalized === "none") {
    return "none";
  }
  if (isPackagingEnum(normalized)) {
    return normalized;
  }
  const legacy = LEGACY_STRING_TO_ENUM[normalized];
  if (legacy != null) {
    return legacy;
  }
  return "none";
};

/**
 * Maps checkout / quick-order form value to the packaging sent on `POST /v1/orders`.
 * Never returns `"none"` — unknown or empty falls back to {@link DEFAULT_CHECKOUT_PACKAGING}.
 */
export const toCheckoutOrderPackagingApi = (
  raw: string | string[] | undefined | null,
): PackagingEnum => {
  const v = toPackagingChoiceApi(raw);
  if (v === "none") {
    return DEFAULT_CHECKOUT_PACKAGING;
  }
  return v;
};

export type ParsedPackagingForAdmin =
  | { kind: "none" }
  | { kind: "enum"; value: PackagingEnum }
  | { kind: "legacy"; bits: number }
  | { kind: "unknown"; raw: string };

const singleBitToEnum = (bits: number): PackagingEnum | null => {
  if (bits === LEGACY_FLAG_BAG) {
    return "white_bag";
  }
  if (bits === LEGACY_FLAG_BAG2) {
    return "black_bag";
  }
  if (bits === LEGACY_FLAG_BOX) {
    return "white_box";
  }
  if (bits === LEGACY_FLAG_BOX2) {
    return "white_box_janeh";
  }
  if (bits === LEGACY_FLAG_BOX3) {
    return "black_box";
  }
  return null;
};

/**
 * Normalize admin/order `packaging` for UI: prefer current enum, else legacy bitmask, else text.
 */
export const parsePackagingForAdmin = (
  raw: number | string | null | undefined,
): ParsedPackagingForAdmin => {
  if (raw == null) {
    return { kind: "none" };
  }
  if (typeof raw === "number" && Number.isFinite(raw)) {
    if (raw === 0) {
      return { kind: "none" };
    }
    const single = singleBitToEnum(raw);
    if (single != null) {
      return { kind: "enum", value: single };
    }
    return { kind: "legacy", bits: raw };
  }
  if (typeof raw === "string") {
    const s = raw.trim();
    if (s.length === 0 || s.toLowerCase() === "none") {
      return { kind: "none" };
    }
    const normalized = s.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
    if (isPackagingEnum(normalized)) {
      return { kind: "enum", value: normalized };
    }
    const fromLegacy = LEGACY_STRING_TO_ENUM[normalized];
    if (fromLegacy != null) {
      return { kind: "enum", value: fromLegacy };
    }
    if (/^\d+$/.test(s)) {
      const n = Number(s);
      if (Number.isFinite(n)) {
        return parsePackagingForAdmin(n);
      }
    }
    return { kind: "unknown", raw: s };
  }
  return { kind: "unknown", raw: String(raw) };
};
