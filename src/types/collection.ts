/** Public API: GET /api/v1/collections */
export interface CollectionItem {
  id: string;
  key: string;
  name: string;
}

export interface CollectionsResponse {
  items: CollectionItem[];
}

/** Admin API: category inside a collection */
export interface AdminCollectionCategoryItem {
  id: string;
  key: string;
  title: string;
  value: number;
}

/** Admin API: GET /api/v1/admin/collections list item */
export interface AdminCollectionItem {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  categories: AdminCollectionCategoryItem[];
}

export interface AdminCollectionsListResponse {
  items: AdminCollectionItem[];
}

/** Admin API: POST /api/v1/admin/collections and PUT /api/v1/admin/collections/{id} */
export interface AdminCollectionBody {
  name: string;
  slug: string;
  sortOrder: number;
}
