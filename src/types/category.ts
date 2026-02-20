export interface CategoryItem {
  id: string;
  key: string;
  title: string;
  collectionId: string;
  collectionName: string;
}

export interface CategoriesResponse {
  items: CategoryItem[];
}
