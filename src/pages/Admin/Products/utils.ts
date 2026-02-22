import type { UploadFile } from "antd/es/upload/interface";
import type { ProductFormValues } from "./types";

const PRODUCT_FORM_STRING_KEYS = [
  "nameHy",
  "nameEn",
  "nameRu",
  "slug",
  "category",
  "descriptionHy",
  "descriptionEn",
  "descriptionRu",
  "storyHy",
  "storyEn",
  "storyRu",
] as const;

const PRODUCT_FORM_NUMBER_KEYS = ["gender", "price"] as const;
const PRODUCT_FORM_BOOLEAN_KEYS = ["isActive", "inStock", "isNew"] as const;

const toString = (v: unknown): string | null =>
  v != null && v !== "" ? String(v) : null;

const toNumber = (v: unknown): number | null =>
  typeof v === "number" && !Number.isNaN(v) ? v : null;

const toBoolStr = (v: unknown): string =>
  v === true || v === "true" ? "true" : "false";

/** Build FormData for POST /v1/admin/products (create). */
export const productValuesToFormData = (
  values: ProductFormValues,
  productFiles: UploadFile[],
  storyFiles: UploadFile[],
  mainImageIndex: number,
): FormData => {
  const fd = new FormData();

  for (const key of PRODUCT_FORM_STRING_KEYS) {
    const value = toString(values[key]);
    if (value !== null) fd.append(key, value);
  }
  for (const key of PRODUCT_FORM_NUMBER_KEYS) {
    const value = toNumber(values[key]);
    if (value !== null) fd.append(key, String(value));
  }
  for (const key of PRODUCT_FORM_BOOLEAN_KEYS) {
    fd.append(key, toBoolStr(values[key]));
  }

  appendProductImagesToFormData(fd, productFiles, mainImageIndex);
  appendStoryImagesToFormData(fd, storyFiles);

  return fd;
};

/** Append product images to FormData (main first). */
export const appendProductImagesToFormData = (
  fd: FormData,
  productFiles: UploadFile[],
  mainImageIndex: number,
): void => {
  if (productFiles.length === 0) return;
  const safeMain = Math.min(mainImageIndex, productFiles.length - 1);
  const mainFile = productFiles[safeMain];
  const main = mainFile?.originFileObj ?? mainFile;
  if (main instanceof File) fd.append("images", main);
  productFiles.forEach((f, i) => {
    if (i === safeMain) return;
    const file = f.originFileObj ?? f;
    if (file instanceof File) fd.append("images", file);
  });
};

/** Append story images to FormData. */
export const appendStoryImagesToFormData = (
  fd: FormData,
  storyFiles: UploadFile[],
): void => {
  storyFiles.forEach((f) => {
    const file = f.originFileObj ?? f;
    if (file instanceof File) fd.append("storyImages", file);
  });
};

/** Build FormData with only product images (for PUT images on edit). */
export const buildProductImagesFormData = (
  productFiles: UploadFile[],
  mainImageIndex: number,
): FormData => {
  const fd = new FormData();
  appendProductImagesToFormData(fd, productFiles, mainImageIndex);
  return fd;
};

/** Build FormData with only story images (for PUT story-images on edit). */
export const buildStoryImagesFormData = (
  storyFiles: UploadFile[],
): FormData => {
  const fd = new FormData();
  appendStoryImagesToFormData(fd, storyFiles);
  return fd;
};
