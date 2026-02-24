/** Gender enum from API (0 = Women, 1 = Men) */
export type Gender = 0 | 1;

/** Admin list: ProductCardAdmin */
export type ProductCardAdmin = {
  id: string;
  name?: string | null;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
  gender?: Gender;
  category?: string | null;
  categoryName?: string | null;
  collectionId?: string | null;
  collectionName?: string | null;
  price?: number;
  mainImageUrl?: string | null;
  tags?: string[] | null;
  isActive?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  createdAt?: string | null;
};

export type PagedProductsAdminResponse = {
  items: ProductCardAdmin[] | null;
  page: number;
  pageSize: number;
  total: number;
};

/** Admin GET /v1/admin/products/{id} (ProductDetailsPublic) */
export type ProductDetailsPublic = {
  id: string;
  slug?: string | null;
  name?: string | null;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  gender?: Gender;
  category?: string | null;
  categoryName?: string | null;
  collectionId?: string | null;
  collectionName?: string | null;
  price?: number;
  mainImageUrl?: string | null;
  descriptionHy?: string | null;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  description?: string | null;
  storyHy?: string | null;
  storyEn?: string | null;
  storyRu?: string | null;
  story?: string | null;
  images?: ProductImage[] | null;
  storyImages?: StoryImageDto[] | null;
  tags?: string[] | null;
  isActive?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  createdAt?: string | null;
};

export type ProductImage = {
  id: string;
  url?: string | null;
  isMain?: boolean;
};

export type StoryImageDto = {
  id: string;
  url?: string | null;
};

/** Admin POST /v1/admin/products (multipart) → CreateProductResponse */
export type CreateProductResponse = {
  id: string;
};

/** Admin PUT /v1/admin/products/{id} (JSON body) */
export type CreateProductRequest = {
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
  gender?: Gender;
  category?: string;
  price?: number;
  descriptionHy?: string | null;
  descriptionEn?: string | null;
  descriptionRu?: string | null;
  storyHy?: string | null;
  storyEn?: string | null;
  storyRu?: string | null;
  isActive?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  tags?: string[] | null;
};

/** Admin PATCH /v1/admin/products/{id}/status */
export type UpdateProductStatusRequest = {
  isActive: boolean;
};

/** Admin GET products query params (exact API names) */
export type AdminProductsListParams = {
  Gender?: string;
  Category?: string;
  CategoryId?: string;
  Search?: string;
  IsActive?: string;
  Page?: string;
  PageSize?: string;
};

/** Public GET /v1/products list item */
export type ProductCardPublic = {
  id: string;
  slug?: string | null;
  name?: string | null;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  gender?: Gender;
  category?: string | null;
  categoryName?: string | null;
  collectionId?: string | null;
  collectionName?: string | null;
  price?: number;
  mainImageUrl?: string | null;
  isActive?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  /** Optional for mocks / backward compat */
  description?: string | null;
};

export type PagedProductsPublicResponse = {
  items: ProductCardPublic[] | null;
  page: number;
  pageSize: number;
  total: number;
};

/** Public catalog list item; alias for ProductCardPublic */
export type Product = ProductCardPublic;

/** Public GET /v1/products query params */
export type ProductListParams = {
  Gender?: string;
  Category?: string;
  CategoryId?: string;
  IsNew?: string;
  SortBy?: string;
  SortOrder?: string;
  Search?: string;
  MinPrice?: string;
  MaxPrice?: string;
  Page?: string;
  PageSize?: string;
};

export type ProductListResponse = PagedProductsPublicResponse;
