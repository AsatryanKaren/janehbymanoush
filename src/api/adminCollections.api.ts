import { http } from "@/api/http";
import type {
  AdminCollectionBody,
  AdminCollectionItem,
  AdminCollectionsListResponse,
} from "@/types/collection";

/** Admin collections: GET/POST/PUT/DELETE /api/v1/admin/collections */
const ADMIN_COLLECTIONS_PATH = "/v1/admin/collections";

export const adminCollectionsApi = {
  getAll: (): Promise<AdminCollectionsListResponse> =>
    http<AdminCollectionsListResponse>(ADMIN_COLLECTIONS_PATH),

  create: (data: AdminCollectionBody): Promise<AdminCollectionItem> =>
    http<AdminCollectionItem>(ADMIN_COLLECTIONS_PATH, {
      method: "POST",
      body: data,
    }),

  update: (
    id: string,
    data: AdminCollectionBody,
  ): Promise<AdminCollectionItem> =>
    http<AdminCollectionItem>(`${ADMIN_COLLECTIONS_PATH}/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_COLLECTIONS_PATH}/${id}`, { method: "DELETE" }),
};
