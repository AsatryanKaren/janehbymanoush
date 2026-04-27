/**
 * Admin jewelry makers — see openapi.json: MasterAdminItem, CreateMasterFormRequest,
 * UpdateMasterFormRequest (multipart/form-data, optional file field `image`).
 */

export type MasterAdminItem = {
  id: string;
  fullNameHy: string | null;
  fullNameEn: string | null;
  fullNameRu: string | null;
  positionHy: string | null;
  positionEn: string | null;
  positionRu: string | null;
  descriptionHy: string | null;
  descriptionEn: string | null;
  descriptionRu: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
};

export type MastersResponse = {
  items: MasterAdminItem[] | null;
};

export type UpdateMasterStatusRequest = {
  isActive: boolean;
};

/** Public GET /v1/masters — MasterItemPublic */
export type MasterItemPublic = {
  id: string;
  fullNameHy: string | null;
  fullNameEn: string | null;
  fullNameRu: string | null;
  positionHy: string | null;
  positionEn: string | null;
  positionRu: string | null;
  descriptionHy: string | null;
  descriptionEn: string | null;
  descriptionRu: string | null;
  imageUrl: string | null;
};

export type MastersPublicResponse = {
  items: MasterItemPublic[] | null;
};
