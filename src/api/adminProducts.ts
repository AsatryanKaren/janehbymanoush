import { http } from "src/api/http";
import type {
  PagedProductsAdminResponse,
  ProductDetailsPublic,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductStatusRequest,
  AdminProductsListParams,
} from "src/types/product";
import { toQueryParams } from "src/utils/queryParams";

const ADMIN_PRODUCTS_PATH = "/v1/admin/products";

export const adminProductsApi = {
  getAll: (params?: AdminProductsListParams): Promise<PagedProductsAdminResponse> =>
    http<PagedProductsAdminResponse>(ADMIN_PRODUCTS_PATH, {
      params: toQueryParams(params),
    }),

  getById: (id: string): Promise<ProductDetailsPublic> =>
    http<ProductDetailsPublic>(`${ADMIN_PRODUCTS_PATH}/${id}`),

  create: (formData: FormData): Promise<CreateProductResponse> =>
    http<CreateProductResponse>(ADMIN_PRODUCTS_PATH, {
      method: "POST",
      body: formData,
    }),

  update: (id: string, data: CreateProductRequest): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}`, { method: "DELETE" }),

  updateStatus: (id: string, data: UpdateProductStatusRequest): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}/status`, {
      method: "PATCH",
      body: data,
    }),

  putImages: (productId: string, formData: FormData): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${productId}/images`, {
      method: "PUT",
      body: formData,
    }),

  deleteImage: (productId: string, imageId: string): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${productId}/images/${imageId}`, {
      method: "DELETE",
    }),

  putStoryImages: (productId: string, formData: FormData): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${productId}/story-images`, {
      method: "PUT",
      body: formData,
    }),

  deleteStoryImage: (productId: string, imageId: string): Promise<void> =>
    http<void>(
      `${ADMIN_PRODUCTS_PATH}/${productId}/story-images/${imageId}`,
      { method: "DELETE" },
    ),
};
