export type AdminAuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export type AdminAuthProviderProps = {
  children: React.ReactNode;
};
