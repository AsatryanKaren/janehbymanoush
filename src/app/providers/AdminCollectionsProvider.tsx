import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { adminCollectionsApi } from "@/api/adminCollections.api";
import type { AdminCollectionItem } from "@/types/collection";

interface AdminCollectionsContextValue {
  collections: AdminCollectionItem[];
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

const AdminCollectionsContext = createContext<AdminCollectionsContextValue | null>(
  null,
);

export function useAdminCollections(): AdminCollectionsContextValue {
  const ctx = useContext(AdminCollectionsContext);
  if (!ctx) {
    throw new Error("useAdminCollections must be used within AdminCollectionsProvider");
  }
  return ctx;
}

interface AdminCollectionsProviderProps {
  children: ReactNode;
}

const AdminCollectionsProvider: React.FC<AdminCollectionsProviderProps> = ({ children }) => {
  const [collections, setCollections] = useState<AdminCollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await adminCollectionsApi.getAll();
      setCollections(res.items ?? []);
    } catch {
      setCollections([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCollections();
  }, [fetchCollections]);

  const value: AdminCollectionsContextValue = {
    collections,
    loading,
    error,
    refetch: fetchCollections,
  };

  return (
    <AdminCollectionsContext.Provider value={value}>
      {children}
    </AdminCollectionsContext.Provider>
  );
};

export default AdminCollectionsProvider;
