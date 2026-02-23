import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { adminCategoriesApi } from "src/api/adminCategories";
import type { CategoryItem } from "src/types/category";
import type {
  AdminCategoriesContextValue,
  AdminCategoriesProviderProps,
} from "./types";

const AdminCategoriesContext = createContext<AdminCategoriesContextValue | null>(
  null,
);

export const useAdminCategories = (): AdminCategoriesContextValue => {
  const ctx = useContext(AdminCategoriesContext);
  if (!ctx) {
    throw new Error("useAdminCategories must be used within AdminCategoriesProvider");
  }
  return ctx;
};

const AdminCategoriesProvider: React.FC<AdminCategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await adminCategoriesApi.getAll();
      setCategories(res.items ?? []);
    } catch {
      setCategories([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const value: AdminCategoriesContextValue = {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };

  return (
    <AdminCategoriesContext.Provider value={value}>
      {children}
    </AdminCategoriesContext.Provider>
  );
};

export default AdminCategoriesProvider;
