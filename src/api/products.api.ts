import { http } from "@/api/http";
import type { Product, ProductListParams, ProductListResponse } from "@/types/product";

export const productsApi = {
  getAll: (params?: ProductListParams): Promise<ProductListResponse> =>
    http<ProductListResponse>("/products", {
      params: {
        category: params?.category,
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
      },
    }),

  getBySlug: (slug: string): Promise<Product> =>
    http<Product>(`/products/${slug}`),

  getById: (id: string): Promise<Product> =>
    http<Product>(`/products/by-id/${id}`),

  create: (data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> =>
    http<Product>("/products", { method: "POST", body: data }),

  update: (
    id: string,
    data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Product> =>
    http<Product>(`/products/${id}`, { method: "PUT", body: data }),

  delete: (id: string): Promise<void> =>
    http<void>(`/products/${id}`, { method: "DELETE" }),
};
