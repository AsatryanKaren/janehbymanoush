import { http } from "src/api/http";
import type { CategoriesResponse } from "src/types/category";

/** GET /api/v1/categories (base URL from env: VITE_API_ROOT + /api) */
const CATEGORIES_PATH = "/v1/categories";

export const categoriesApi = {
  getAll: (): Promise<CategoriesResponse> =>
    http<CategoriesResponse>(CATEGORIES_PATH),
};
