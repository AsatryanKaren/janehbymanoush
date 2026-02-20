import { http } from "@/api/http";
import type { Product, ProductListParams, ProductListResponse } from "@/types/product";

/** GET/POST /api/v1/products (base URL from env: VITE_API_ROOT + /api) */
const PRODUCTS_PATH = "/v1/products";

export const productsApi = {
  getAll: (params?: ProductListParams): Promise<ProductListResponse> =>
    http<ProductListResponse>(PRODUCTS_PATH, {
      params: {
        category: params?.category,
        collectionId: params?.collectionId,
        page: params?.page,
        pageSize: params?.pageSize,
        search: params?.search,
      },
    }),

  getBySlug: (slug: string): Promise<Product> =>
    http<Product>(`${PRODUCTS_PATH}/${slug}`),
};
