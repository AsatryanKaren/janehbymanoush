/** Admin POST /v1/admin/auth/login request (OpenAPI: AdminLoginRequest) */
export type AdminLoginRequest = {
  username?: string | null;
  password?: string | null;
};

/** Admin login/refresh response (OpenAPI: AdminLoginResponse) */
export type AdminLoginResponse = {
  accessToken?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: string;
};

/** Admin POST /v1/admin/auth/refresh request (OpenAPI: RefreshTokenRequest) */
export type RefreshTokenRequest = {
  refreshToken?: string | null;
};
