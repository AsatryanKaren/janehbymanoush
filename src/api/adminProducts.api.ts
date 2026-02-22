import { http } from "src/api/http";
import type {
  CreateProductBody,
  Product,
  ProductListParams,
  ProductListResponse,
  UpdateProductBody,
} from "src/types/product";

/** Admin product API: GET/POST/PUT/DELETE /api/v1/admin/products */
const ADMIN_PRODUCTS_PATH = "/v1/admin/products";

export const adminProductsApi = {
  getAll: (params?: ProductListParams): Promise<ProductListResponse> =>
    http<ProductListResponse>(ADMIN_PRODUCTS_PATH, {
      params: {
        category: params?.category,
        collectionId: params?.collectionId,
        page: params?.page,
        pageSize: params?.pageSize,
        search: params?.search,
      },
    }),

  getById: (id: string): Promise<Product> =>
    http<Product>(`${ADMIN_PRODUCTS_PATH}/${id}`),

  create: (data: CreateProductBody): Promise<Product> =>
    http<Product>(ADMIN_PRODUCTS_PATH, { method: "POST", body: data }),

  update: (id: string, data: UpdateProductBody): Promise<Product> =>
    http<Product>(`${ADMIN_PRODUCTS_PATH}/${id}`, { method: "PUT", body: data }),

  delete: (id: string): Promise<void> =>
    http<void>(`${ADMIN_PRODUCTS_PATH}/${id}`, { method: "DELETE" }),
};
