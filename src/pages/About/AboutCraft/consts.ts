export const CRAFT_COLUMNS = [
  "handicraft",
  "design",
  "collections",
] as const;

export type CraftColumnKey = (typeof CRAFT_COLUMNS)[number];

export const CRAFT_IMAGE_MAP: Record<CraftColumnKey, string> = {
  handicraft:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  design:
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80",
  collections:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
};
