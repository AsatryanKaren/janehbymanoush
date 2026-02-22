import { http } from "src/api/http";
import type {
  CategoriesResponse,
  CreateCategoryRequest,
  CategoryResponse,
  UpdateCategoryRequest,
} from "src/types/category";
import { toQueryParams } from "src/utils/queryParams";

const ADMIN_CATEGORIES_PATH = "/v1/admin/categories";

export const adminCategoriesApi = {
  getAll: (collectionId?: string): Promise<CategoriesResponse> =>
    http<CategoriesResponse>(ADMIN_CATEGORIES_PATH, {
      params: toQueryParams(collectionId != null ? { collectionId } : undefined),
    }),

  create: (data: CreateCategoryRequest): Promise<CategoryResponse> =>
    http<CategoryResponse>(ADMIN_CATEGORIES_PATH, {
      method: "POST",
      body: data,
    }),

  update: (id: string, data: UpdateCategoryRequest): Promise<void> =>
    http<void>(`${ADMIN_CATEGORIES_PATH}/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_CATEGORIES_PATH}/${id}`, { method: "DELETE" }),
};
