/** API: CategoryItem (admin list) */
export type CategoryItem = {
  id: string;
  title?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  collectionId?: string | null;
  collectionName?: string | null;
};

export type CategoriesResponse = {
  items: CategoryItem[] | null;
};

/** Admin POST /v1/admin/categories */
export type CreateCategoryRequest = {
  collectionId?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
};

/** Admin PUT /v1/admin/categories/{id} */
export type UpdateCategoryRequest = {
  collectionId?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  value?: number | null;
};

/** Admin POST response / CategoryResponse */
export type CategoryResponse = {
  id: string;
  collectionId?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  value?: number | null;
};
