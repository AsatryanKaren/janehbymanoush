/** Category with value (inside collection) */
export interface CategoryItemWithValue {
  id: string;
  title?: string | null;
  titleHy?: string | null;
  titleEn?: string | null;
  titleRu?: string | null;
  value?: number | null;
}

/** Admin API: GET /v1/admin/collections list item (CollectionItemDto) */
export interface AdminCollectionItem {
  id: string;
  name?: string | null;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
  categories?: CategoryItemWithValue[] | null;
}

export interface CollectionsResponse {
  items: AdminCollectionItem[] | null;
}

/** Admin POST /v1/admin/collections */
export interface CreateCollectionRequest {
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
}

/** Admin PUT /v1/admin/collections/{id} */
export interface UpdateCollectionRequest {
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
}

/** Admin POST response */
export interface CollectionResponse {
  id: string;
  nameHy?: string | null;
  nameEn?: string | null;
  nameRu?: string | null;
  slug?: string | null;
}
