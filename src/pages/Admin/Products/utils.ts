import type { UploadFile } from "antd/es/upload/interface";
import { genderFromApi, genderToApi } from "src/types/product";
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

const PRODUCT_FORM_NUMBER_KEYS = ["price"] as const;
const PRODUCT_FORM_BOOLEAN_KEYS = ["isActive", "inStock", "isNew"] as const;

const toString = (v: unknown): string | null =>
  v != null && v !== "" ? String(v) : null;

const toNumber = (v: unknown): number | null => {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

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
  fd.append("gender", genderToApi(genderFromApi(values.gender)));
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

/** Options for building update (PUT) FormData — UpdateProductFormRequest. */
export type UpdateFormDataOptions = {
  values: ProductFormValues;
  /** New product images to add (array). */
  newProductImageFiles: File[];
  /** Main image when it is one of the new files — send as favoriteImage (binary). */
  mainProductImageFile: File | null;
  /** Main image when it is already uploaded — send as favoriteImageId (uuid). */
  mainExistingImageId: string | null;
  /** Product image ids from BE that user deleted in edit; sent as deletedImageIds. New images removed from list are not sent (no id). */
  deletedImageIds: string[];
  /** Story image ids from BE that user deleted in edit; sent as DeletedStoryImageIds. */
  deletedStoryImageIds: string[];
  /** Story image files to set on the product (key: storyImage). */
  storyImageFiles: File[];
};

/** Build FormData for PUT /v1/admin/products/{id} (UpdateProductFormRequest). */
export const productValuesToUpdateFormData = (
  options: UpdateFormDataOptions,
): FormData => {
  const {
    values,
    newProductImageFiles,
    mainProductImageFile,
    mainExistingImageId,
    deletedImageIds,
    deletedStoryImageIds,
    storyImageFiles,
  } = options;
  const fd = new FormData();

  for (const key of PRODUCT_FORM_STRING_KEYS) {
    const value = toString(values[key]);
    if (value !== null) fd.append(key, value);
  }
  for (const key of PRODUCT_FORM_NUMBER_KEYS) {
    const value = toNumber(values[key]);
    if (value !== null) fd.append(key, String(value));
  }
  fd.append("gender", genderToApi(genderFromApi(values.gender)));
  for (const key of PRODUCT_FORM_BOOLEAN_KEYS) {
    fd.append(key, toBoolStr(values[key]));
  }

  for (const file of newProductImageFiles) {
    fd.append("newImages", file);
  }
  /* Send every removed existing product image id (one form field per id). */
  for (const imageId of deletedImageIds) {
    fd.append("deletedImageIds", imageId);
  }
  if (mainExistingImageId != null && mainExistingImageId !== "") {
    fd.append("favoriteImageId", mainExistingImageId);
  }
  if (mainProductImageFile != null) {
    fd.append("favoriteImage", mainProductImageFile);
  }
  for (const imageId of deletedStoryImageIds) {
    fd.append("DeletedStoryImageIds", imageId);
  }
  for (const file of storyImageFiles) {
    fd.append("storyImage", file);
  }

  return fd;
};
