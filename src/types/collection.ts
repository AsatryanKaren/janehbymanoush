/** Category with value (inside collection) */
export type CategoryItemWithValue = {
  id: string;
  title?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  value?: number | null;
};

/** Admin API: GET /v1/admin/collections list item (CollectionItemDto) */
export type AdminCollectionItem = {
  id: string;
  name?: string | null;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
  categories?: CategoryItemWithValue[] | null;
};

export type CollectionsResponse = {
  items: AdminCollectionItem[] | null;
};

/** Admin POST /v1/admin/collections */
export type CreateCollectionRequest = {
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
};

/** Admin PUT /v1/admin/collections/{id} */
export type UpdateCollectionRequest = {
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
};

/** Admin POST response */
export type CollectionResponse = {
  id: string;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
};
