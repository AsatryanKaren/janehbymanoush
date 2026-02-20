import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { adminCategoriesApi } from "@/api/adminCategories.api";
import type { CategoryItem } from "@/types/category";

interface AdminCategoriesContextValue {
  categories: CategoryItem[];
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

const AdminCategoriesContext = createContext<AdminCategoriesContextValue | null>(
  null,
);

export function useAdminCategories(): AdminCategoriesContextValue {
  const ctx = useContext(AdminCategoriesContext);
  if (!ctx) {
    throw new Error("useAdminCategories must be used within AdminCategoriesProvider");
  }
  return ctx;
}

interface AdminCategoriesProviderProps {
  children: ReactNode;
}

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
