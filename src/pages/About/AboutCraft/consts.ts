import {
  CF_CRAFT_COLLECTIONS,
  CF_CRAFT_DESIGN,
  CF_CRAFT_HANDICRAFT,
} from "src/consts/gallery";

export const CRAFT_COLUMNS = [
  "handicraft",
  "design",
  "collections",
] as const;

export type CraftColumnKey = (typeof CRAFT_COLUMNS)[number];

export const CRAFT_IMAGE_MAP: Record<CraftColumnKey, string> = {
  handicraft: CF_CRAFT_HANDICRAFT,
  design: CF_CRAFT_DESIGN,
  collections: CF_CRAFT_COLLECTIONS,
};
