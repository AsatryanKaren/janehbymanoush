export type ActiveFilterKind =
  | "section"
  | "search"
  | "price"
  | "collection"
  | "category"
  | "productType";

export type CatalogProductTypeOption = {
  key: string;
  title?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
};

export type ActiveFilterTag = {
  key: string;
  kind: ActiveFilterKind;
  label: string;
};
