import type { ReactNode } from "react";
import type { AdminCollectionItem } from "src/types/collection";

export type AdminCollectionsContextValue = {
  collections: AdminCollectionItem[];
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
};

export type AdminCollectionsProviderProps = {
  children: ReactNode;
};
