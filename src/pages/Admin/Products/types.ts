import type { CreateProductRequest, Gender, ProductDetailsPublic } from "src/types/product";

/** Form field values for product create/edit. Single source of truth for form shape. */
export interface ProductFormValues {
  nameHy?: string;
  nameEn?: string;
  nameRu?: string;
  slug?: string;
  gender: number;
  category?: string;
  price?: number;
  descriptionHy?: string;
  descriptionEn?: string;
  descriptionRu?: string;
  storyHy?: string;
  storyEn?: string;
  storyRu?: string;
  isActive: boolean;
  inStock: boolean;
  isNew: boolean;
}

const DEFAULT_FORM_VALUES: ProductFormValues = {
  gender: 0,
  isActive: true,
  inStock: true,
  isNew: false,
};

/** Map API product to form values (edit mode load). */
export const productToFormValues = (
  loaded: ProductDetailsPublic,
): ProductFormValues => ({
  nameHy: loaded.nameHy ?? undefined,
  nameEn: loaded.nameEn ?? undefined,
  nameRu: loaded.nameRu ?? undefined,
  slug: loaded.slug ?? undefined,
  gender: loaded.gender ?? 0,
  category: loaded.category ?? undefined,
  price: loaded.price ?? undefined,
  descriptionHy: loaded.descriptionHy ?? undefined,
  descriptionEn: loaded.descriptionEn ?? undefined,
  descriptionRu: loaded.descriptionRu ?? undefined,
  storyHy: loaded.storyHy ?? undefined,
  storyEn: loaded.storyEn ?? undefined,
  storyRu: loaded.storyRu ?? undefined,
  isActive: loaded.isActive ?? true,
  inStock: loaded.inStock ?? true,
  isNew: loaded.isNew ?? false,
});

/** Map form values to API update/create body. */
export const formValuesToCreateRequest = (
  values: ProductFormValues,
): CreateProductRequest => ({
    nameHy: values.nameHy ?? null,
    nameEn: values.nameEn ?? null,
    nameRu: values.nameRu ?? null,
    slug: values.slug ?? null,
    gender: (values.gender as Gender) ?? 0,
    category: values.category ?? undefined,
    price: values.price ?? 0,
    descriptionHy: values.descriptionHy ?? null,
    descriptionEn: values.descriptionEn ?? null,
    descriptionRu: values.descriptionRu ?? null,
    storyHy: values.storyHy ?? null,
    storyEn: values.storyEn ?? null,
    storyRu: values.storyRu ?? null,
    isActive: values.isActive ?? true,
    inStock: values.inStock ?? true,
    isNew: values.isNew ?? false,
});

export const PRODUCT_EDIT_DEFAULTS = DEFAULT_FORM_VALUES;
