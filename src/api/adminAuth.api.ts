import { http } from "src/api/http";
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  RefreshTokenRequest,
} from "src/types/auth";

const AUTH_LOGIN_PATH = "/v1/admin/auth/login";
const AUTH_REFRESH_PATH = "/v1/admin/auth/refresh";

export const adminAuthApi = {
  login: (body: AdminLoginRequest): Promise<AdminLoginResponse> =>
    http<AdminLoginResponse>(AUTH_LOGIN_PATH, { method: "POST", body }),

  refresh: (body: RefreshTokenRequest): Promise<AdminLoginResponse> =>
    http<AdminLoginResponse>(AUTH_REFRESH_PATH, { method: "POST", body }),
};
