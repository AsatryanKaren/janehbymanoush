export type ActiveFilterKind =
  | "section"
  | "search"
  | "price"
  | "collection"
  | "category";

export type ActiveFilterTag = {
  key: string;
  kind: ActiveFilterKind;
  label: string;
};
