import type { UploadFile } from "antd/es/upload/interface";
import type { CreateProductRequest, Gender, ProductDetailsPublic } from "src/types/product";
import { Gender as GenderEnum, genderFromApi } from "src/types/product";

/** Form field values for product create/edit. Single source of truth for form shape. */
export type ProductFormValues = {
  nameHy?: string;
  nameEn?: string;
  nameRu?: string;
  slug?: string;
  gender: Gender;
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
};

export type ProductImagesUploadProps = {
  fileList: UploadFile[];
  onFileListChange: (fileList: UploadFile[]) => void;
  mainIndex: number;
  onMainIndexChange: (index: number) => void;
  t: (key: string) => string;
  showUploadList?: { showPreviewIcon: boolean };
  maxCount?: number;
};

const DEFAULT_FORM_VALUES: ProductFormValues = {
  gender: GenderEnum.Women,
  isActive: true,
  inStock: true,
  isNew: false,
};

/** Slug suffix for “duplicate as new” so the new product does not collide with the source. */
export const DUPLICATE_PRODUCT_SLUG_SUFFIX = "-copy";

/** Map API product to form values (edit mode load). */
export const productToFormValues = (
  loaded: ProductDetailsPublic,
): ProductFormValues => ({
  nameHy: loaded.nameHy ?? undefined,
  nameEn: loaded.nameEn ?? undefined,
  nameRu: loaded.nameRu ?? undefined,
  slug: loaded.slug ?? undefined,
  gender: genderFromApi(loaded.gender),
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

/** Map API product to form values for creating a copy (unique slug; story text left empty). */
export const productToDuplicateFormValues = (
  loaded: ProductDetailsPublic,
): ProductFormValues => {
  const base = productToFormValues(loaded);
  const slug = base.slug?.trim();
  return {
    ...base,
    slug: slug ? `${slug}${DUPLICATE_PRODUCT_SLUG_SUFFIX}` : undefined,
    storyHy: undefined,
    storyEn: undefined,
    storyRu: undefined,
  };
};

/** Map form values to API update/create body. */
export const formValuesToCreateRequest = (
  values: ProductFormValues,
): CreateProductRequest => ({
    nameHy: values.nameHy ?? null,
    nameEn: values.nameEn ?? null,
    nameRu: values.nameRu ?? null,
    slug: values.slug ?? null,
    gender: values.gender ?? GenderEnum.Women,
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
