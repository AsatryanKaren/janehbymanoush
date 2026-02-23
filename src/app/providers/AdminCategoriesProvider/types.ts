import type { ReactNode } from "react";
import type { CategoryItem } from "src/types/category";

export type AdminCategoriesContextValue = {
  categories: CategoryItem[];
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
};

export type AdminCategoriesProviderProps = {
  children: ReactNode;
};
