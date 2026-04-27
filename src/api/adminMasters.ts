import { http } from "src/api/http";
import type {
  MasterAdminItem,
  MastersResponse,
  UpdateMasterStatusRequest,
} from "src/types/master";
import { toQueryParams } from "src/utils/queryParams";

const ADMIN_MASTERS_PATH = "/v1/admin/masters";

export type AdminMastersListParams = {
  isActive?: string;
};

/**
 * OpenAPI: POST/PUT use multipart/form-data (CreateMasterFormRequest / UpdateMasterFormRequest).
 * Optional file field name: `image`. No GET by id in spec — use getAll and find the row to edit.
 */
export const adminMastersApi = {
  getAll: (params?: AdminMastersListParams): Promise<MastersResponse> =>
    http<MastersResponse>(ADMIN_MASTERS_PATH, {
      params: toQueryParams(params),
    }),

  create: (formData: FormData): Promise<MasterAdminItem> =>
    http<MasterAdminItem>(ADMIN_MASTERS_PATH, { method: "POST", body: formData }),

  update: (id: string, formData: FormData): Promise<void> =>
    http<void>(`${ADMIN_MASTERS_PATH}/${id}`, { method: "PUT", body: formData }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_MASTERS_PATH}/${id}`, { method: "DELETE" }),

  updateStatus: (id: string, data: UpdateMasterStatusRequest): Promise<void> =>
    http<void>(`${ADMIN_MASTERS_PATH}/${id}/status`, { method: "PATCH", body: data }),
};
