import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { adminCollectionsApi } from "src/api/adminCollections";
import type { AdminCollectionItem } from "src/types/collection";
import type {
  AdminCollectionsContextValue,
  AdminCollectionsProviderProps,
} from "./types";

const AdminCollectionsContext = createContext<AdminCollectionsContextValue | null>(
  null,
);

export const useAdminCollections = (): AdminCollectionsContextValue => {
  const ctx = useContext(AdminCollectionsContext);
  if (!ctx) {
    throw new Error("useAdminCollections must be used within AdminCollectionsProvider");
  }
  return ctx;
};

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
