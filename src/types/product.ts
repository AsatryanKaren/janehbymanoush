/** Gender enum for API: 0 = Women, 1 = Men. Required for admin product create/update. */
export const Gender = {
  Women: 0,
  Men: 1,
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

/** API returns/expects gender as lowercase string "women" | "men". */
export const GENDER_API_VALUES = {
  [Gender.Women]: "women",
  [Gender.Men]: "men",
} as const;

/** Map API response (e.g. "men", "women" or 0, 1) to our Gender enum. */
export function genderFromApi(value: unknown): Gender {
  if (value === Gender.Women || value === Gender.Men) return value;
  const s = String(value).toLowerCase();
  if (s === "men") return Gender.Men;
  if (s === "women") return Gender.Women;
  const n = Number(value);
  if (n === Gender.Men) return Gender.Men;
  if (n === Gender.Women) return Gender.Women;
  return Gender.Women;
}

/** Map our Gender to API request value ("women" | "men"). */
export function genderToApi(g: Gender): string {
  return GENDER_API_VALUES[g];
}

/** Select options for admin product form (create/update). */
export const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: "Women", value: Gender.Women },
  { label: "Men", value: Gender.Men },
];

/** Labels for display (e.g. product view). */
export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.Women]: "Women",
  [Gender.Men]: "Men",
};

export function isGender(value: unknown): value is Gender {
  if (value === Gender.Women || value === Gender.Men) return true;
  const n = Number(value);
  return n === Gender.Women || n === Gender.Men;
}

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
  /** Bestseller/featured; set via PUT .../featured */
  isBestSeller?: boolean;
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
  isBestSeller?: boolean;
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
  CollectionId?: string;
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

/** GET /v1/bestsellers response */
export type BestsellersResponse = {
  items: ProductCardPublic[] | null;
};
