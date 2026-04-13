/**
 * Resolve product (and list item) text by current app language.
 * API returns nameEn, nameRu, nameHy (and description/story variants);
 * we pick the one matching lang and fallback to others if empty.
 */

export type AppLang = "en" | "ru" | "hy";

export function normalizeLang(lang: string): AppLang {
  const lower = lang.toLowerCase();
  if (lower.startsWith("hy")) return "hy";
  if (lower.startsWith("ru")) return "ru";
  return "en";
}

type WithName = {
  nameEn?: string | null;
  nameRu?: string | null;
  nameHy?: string | null;
  name?: string | null;
};

type WithDescription = WithName & {
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  descriptionHy?: string | null;
  description?: string | null;
};

type WithStory = {
  storyEn?: string | null;
  storyRu?: string | null;
  storyHy?: string | null;
  story?: string | null;
};

function pickByLang(
  lang: AppLang,
  en: string | null | undefined,
  ru: string | null | undefined,
  hy: string | null | undefined,
  fallback: string | null | undefined,
): string {
  const primary =
    lang === "hy" ? hy : lang === "ru" ? ru : en;
  return (
    (primary?.trim() && primary) ||
    (en?.trim() && en) ||
    (hy?.trim() && hy) ||
    (ru?.trim() && ru) ||
    (fallback?.trim() && fallback) ||
    ""
  );
}

export function getProductName(
  product: WithName,
  lang: string,
): string {
  const L = normalizeLang(lang);
  return pickByLang(
    L,
    product.nameEn,
    product.nameRu,
    product.nameHy,
    product.name,
  );
}

export function getProductDescription(
  product: WithDescription,
  lang: string,
): string {
  const L = normalizeLang(lang);
  return pickByLang(
    L,
    product.descriptionEn,
    product.descriptionRu,
    product.descriptionHy,
    product.description,
  );
}

export function getProductStory(
  product: WithStory,
  lang: string,
): string | null {
  const L = normalizeLang(lang);
  const primary =
    L === "hy"
      ? product.storyHy
      : L === "ru"
        ? product.storyRu
        : product.storyEn;
  const value =
    (primary?.trim() && primary) ||
    (product.storyEn?.trim() && product.storyEn) ||
    (product.storyHy?.trim() && product.storyHy) ||
    (product.storyRu?.trim() && product.storyRu) ||
    (product.story?.trim() && product.story) ||
    null;
  return value;
}

type WithCategoryNames = {
  categoryNameEn?: string | null;
  categoryNameRu?: string | null;
  categoryNameHy?: string | null;
  categoryName?: string | null;
};

type WithCollectionNames = {
  collectionNameEn?: string | null;
  collectionNameRu?: string | null;
  collectionNameHy?: string | null;
  collectionName?: string | null;
};

/** Category label for current locale; falls back to legacy `categoryName`. */
export function getProductCategoryName(
  product: WithCategoryNames,
  lang: string,
): string {
  const L = normalizeLang(lang);
  return pickByLang(
    L,
    product.categoryNameEn,
    product.categoryNameRu,
    product.categoryNameHy,
    product.categoryName,
  );
}

/** Collection label for current locale; falls back to legacy `collectionName`. */
export function getProductCollectionName(
  product: WithCollectionNames,
  lang: string,
): string {
  const L = normalizeLang(lang);
  return pickByLang(
    L,
    product.collectionNameEn,
    product.collectionNameRu,
    product.collectionNameHy,
    product.collectionName,
  );
}
