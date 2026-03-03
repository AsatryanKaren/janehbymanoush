import { http } from "src/api/http";
import type {
  PagedProductsAdminResponse,
  ProductDetailsPublic,
  CreateProductResponse,
  UpdateProductStatusRequest,
  AdminProductsListParams,
} from "src/types/product";

export type SetProductFeaturedRequest = { isFeatured: boolean };
import { toQueryParams } from "src/utils/queryParams";

const ADMIN_PRODUCTS_PATH = "/v1/admin/products";

export const adminProductsApi = {
  getAll: (params?: AdminProductsListParams): Promise<PagedProductsAdminResponse> =>
    http<PagedProductsAdminResponse>(ADMIN_PRODUCTS_PATH, {
      params: toQueryParams(params),
    }),

  getById: (id: string): Promise<ProductDetailsPublic> =>
    http<ProductDetailsPublic>(`${ADMIN_PRODUCTS_PATH}/${id}`),

  /** POST multipart/form-data — CreateProductFormRequest */
  create: (formData: FormData): Promise<CreateProductResponse> =>
    http<CreateProductResponse>(ADMIN_PRODUCTS_PATH, {
      method: "POST",
      body: formData,
    }),

  /** PUT multipart/form-data — UpdateProductFormRequest (single request for fields + images) */
  update: (id: string, formData: FormData): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}`, {
      method: "PUT",
      body: formData,
    }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}`, { method: "DELETE" }),

  updateStatus: (id: string, data: UpdateProductStatusRequest): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}/status`, {
      method: "PATCH",
      body: data,
    }),

  setFeatured: (
    id: string,
    data: SetProductFeaturedRequest,
  ): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}/featured`, {
      method: "PUT",
      body: data,
    }),
};
