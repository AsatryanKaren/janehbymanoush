export type MasterFormDataInput = {
  fullNameHy?: string | null;
  fullNameEn?: string | null;
  fullNameRu?: string | null;
  positionHy?: string | null;
  positionEn?: string | null;
  positionRu?: string | null;
  descriptionHy?: string | null;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  isActive: boolean;
  imageFile: File | null;
};

const append = (fd: FormData, key: string, value: string | null | undefined): void => {
  fd.append(key, value?.trim() ?? "");
};

/**
 * Build multipart body for CreateMasterFormRequest / UpdateMasterFormRequest (OpenAPI).
 */
export const buildMasterFormData = (v: MasterFormDataInput): FormData => {
  const fd = new FormData();
  append(fd, "fullNameHy", v.fullNameHy);
  append(fd, "fullNameEn", v.fullNameEn);
  append(fd, "fullNameRu", v.fullNameRu);
  append(fd, "positionHy", v.positionHy);
  append(fd, "positionEn", v.positionEn);
  append(fd, "positionRu", v.positionRu);
  append(fd, "descriptionHy", v.descriptionHy);
  append(fd, "descriptionEn", v.descriptionEn);
  append(fd, "descriptionRu", v.descriptionRu);
  fd.append("isActive", v.isActive ? "true" : "false");
  if (v.imageFile) {
    fd.append("image", v.imageFile);
  }
  return fd;
};
