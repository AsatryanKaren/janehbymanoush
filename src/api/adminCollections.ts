import { http } from "src/api/http";
import type {
  CollectionsResponse,
  CreateCollectionRequest,
  CollectionResponse,
  UpdateCollectionRequest,
} from "src/types/collection";

const ADMIN_COLLECTIONS_PATH = "/v1/admin/collections";

export const adminCollectionsApi = {
  getAll: (): Promise<CollectionsResponse> =>
    http<CollectionsResponse>(ADMIN_COLLECTIONS_PATH),

  create: (data: CreateCollectionRequest): Promise<CollectionResponse> =>
    http<CollectionResponse>(ADMIN_COLLECTIONS_PATH, {
      method: "POST",
      body: data,
    }),

  update: (id: string, data: UpdateCollectionRequest): Promise<void> =>
    http<void>(`${ADMIN_COLLECTIONS_PATH}/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_COLLECTIONS_PATH}/${id}`, { method: "DELETE" }),
};
