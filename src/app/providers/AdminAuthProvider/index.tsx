import { createContext, useCallback, useContext, useState } from "react";
import { adminAuthApi } from "src/api/adminAuth.api";
import {
  clearAdminTokens,
  hasAdminTokens,
  setAdminTokens,
} from "src/api/adminAuthStorage";
import type {
  AdminAuthContextValue,
  AdminAuthProviderProps,
} from "./types";

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export const useAdminAuth = (): AdminAuthContextValue => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
};

const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAdminTokens());

  const login = useCallback(async (username: string, password: string) => {
    const res = await adminAuthApi.login({ username, password });
    const access = res.accessToken ?? "";
    const refresh = res.refreshToken ?? "";
    if (!access) {
      throw new Error("No access token in response");
    }
    setAdminTokens(access, refresh);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearAdminTokens();
    setIsAuthenticated(false);
  }, []);

  const value: AdminAuthContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
