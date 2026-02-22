import { http } from "src/api/http";
import type {
  ProductListParams,
  ProductListResponse,
  ProductDetailsPublic,
} from "src/types/product";
import { toQueryParams } from "src/utils/queryParams";

const PRODUCTS_PATH = "/v1/products";

export const productsApi = {
  getAll: (params?: ProductListParams): Promise<ProductListResponse> =>
    http<ProductListResponse>(PRODUCTS_PATH, { params: toQueryParams(params) }),

  getBySlug: (slug: string): Promise<ProductDetailsPublic> =>
    http<ProductDetailsPublic>(`${PRODUCTS_PATH}/${slug}`),
};
