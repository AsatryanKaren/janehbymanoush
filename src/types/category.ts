/** API: CategoryItem (admin list) */
export interface CategoryItem {
  id: string;
  title?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  collectionId?: string | null;
  collectionName?: string | null;
}

export interface CategoriesResponse {
  items: CategoryItem[] | null;
}

/** Admin POST /v1/admin/categories */
export interface CreateCategoryRequest {
  collectionId?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
}

/** Admin PUT /v1/admin/categories/{id} */
export interface UpdateCategoryRequest {
  collectionId?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  value?: number | null;
}

/** Admin POST response / CategoryResponse */
export interface CategoryResponse {
  id: string;
  collectionId?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  value?: number | null;
}
