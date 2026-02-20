import { http } from "@/api/http";
import type { CollectionsResponse } from "@/types/collection";

/** GET /api/v1/collections (base URL from env: VITE_API_ROOT + /api) */
const COLLECTIONS_PATH = "/v1/collections";

export const collectionsApi = {
  getAll: (): Promise<CollectionsResponse> =>
    http<CollectionsResponse>(COLLECTIONS_PATH),
};
