import type { MasterItemPublic } from "src/types/master";
import type { JewelryMaker } from "./types";

const pickTrilingual = (
  language: string,
  hy: string | null,
  en: string | null,
  ru: string | null,
): string => {
  const h = hy?.trim() || null;
  const e = en?.trim() || null;
  const r = ru?.trim() || null;
  if (language === "hy" && h) {
    return h;
  }
  if (language === "ru" && r) {
    return r;
  }
  if (language === "en" && e) {
    return e;
  }
  return e ?? h ?? r ?? "";
};

export const masterPublicToJewelryMaker = (
  item: MasterItemPublic,
  language: string,
): JewelryMaker => {
  const name = pickTrilingual(
    language,
    item.fullNameHy,
    item.fullNameEn,
    item.fullNameRu,
  );
  const position = pickTrilingual(
    language,
    item.positionHy,
    item.positionEn,
    item.positionRu,
  );
  const description = pickTrilingual(
    language,
    item.descriptionHy,
    item.descriptionEn,
    item.descriptionRu,
  );
  const url = item.imageUrl?.trim();
  return {
    id: item.id,
    name,
    description,
    role: position || undefined,
    imageUrl: url || undefined,
    imageAlt: name,
  };
};

export const getInitialsFromName = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0]!}${parts[parts.length - 1]![0]!}`.toUpperCase();
};
