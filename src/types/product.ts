/** Product as returned by /api/v1/products */
export interface Product {
  id: string;
  slug: string;
  name: string;
  gender: number;
  category: string;
  categoryId: string;
  collectionId: string;
  collectionName: string;
  price: number;
  currency: string;
  mainImageUrl: string;
  isActive: boolean;
  /** Optional, e.g. from getById */
  description?: string;
  story?: string;
}

/** Body for POST /api/v1/admin/products and PUT /api/v1/admin/products/{id} */
export interface CreateProductBody {
  name: string;
  slug: string;
  gender: number;
  category: string;
  categoryId: string;
  price: number;
  currency: string;
  description?: string;
  story?: string;
  isActive: boolean;
}

export type UpdateProductBody = CreateProductBody;

export interface ProductListParams {
  category?: string;
  collectionId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface ProductListResponse {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
}
