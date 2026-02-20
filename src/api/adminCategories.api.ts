import { http } from "@/api/http";
import type { CategoriesResponse } from "@/types/category";

/** Admin categories: GET /api/v1/admin/categories */
const ADMIN_CATEGORIES_PATH = "/v1/admin/categories";

export const adminCategoriesApi = {
  getAll: (): Promise<CategoriesResponse> =>
    http<CategoriesResponse>(ADMIN_CATEGORIES_PATH),
};
