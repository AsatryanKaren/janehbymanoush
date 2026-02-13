export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  images: string[];
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  category?: ProductCategory;
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export enum ProductCategory {
  Women = "women",
  Men = "men",
  Unisex = "unisex",
}
