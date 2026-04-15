import type { AdminCollectionItem, CategoryItemWithValue } from "src/types/collection";
import {
  CATALOG_FILTER_CATEGORY_PREFIX,
  CATALOG_FILTER_COLLECTION_PREFIX,
} from "./consts";

export const getCategoryTitle = (item: CategoryItemWithValue, lang: string): string => {
  if (lang === "hy" && item.titleHy) return item.titleHy;
  if (lang === "ru" && item.titleRu) return item.titleRu;
  return item.titleEn ?? item.titleHy ?? item.titleRu ?? "";
};

export const getCollectionTitle = (item: AdminCollectionItem, lang: string): string => {
  if (lang === "hy" && item.nameHy) return item.nameHy;
  if (lang === "ru" && item.nameRu) return item.nameRu;
  return item.nameEn ?? item.nameHy ?? item.nameRu ?? item.name ?? "";
};

export const findCategoryInCollections = (
  cols: AdminCollectionItem[],
  catId: string,
): CategoryItemWithValue | undefined => {
  for (const col of cols) {
    const hit = (col.categories ?? []).find((c) => c.id === catId);
    if (hit) return hit;
  }
  return undefined;
};

export const getCatalogSelectionIds = (
  filterValue: string | undefined,
): { collectionId: string | null; categoryId: string | null } => {
  if (!filterValue) {
    return { collectionId: null, categoryId: null };
  }
  if (filterValue.startsWith(CATALOG_FILTER_COLLECTION_PREFIX)) {
    return {
      collectionId: filterValue.slice(CATALOG_FILTER_COLLECTION_PREFIX.length),
      categoryId: null,
    };
  }
  if (filterValue.startsWith(CATALOG_FILTER_CATEGORY_PREFIX)) {
    return {
      collectionId: null,
      categoryId: filterValue.slice(CATALOG_FILTER_CATEGORY_PREFIX.length),
    };
  }
  return { collectionId: null, categoryId: null };
};

export const catalogCollectionFilterValue = (id: string): string =>
  `${CATALOG_FILTER_COLLECTION_PREFIX}${id}`;

export const catalogCategoryFilterValue = (id: string): string =>
  `${CATALOG_FILTER_CATEGORY_PREFIX}${id}`;
