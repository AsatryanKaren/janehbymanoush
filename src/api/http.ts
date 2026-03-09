import axios from "axios";
import { ENV } from "src/config/env";
import { getAdminAccessToken, clearAdminTokens } from "src/api/adminAuthStorage";
import { ROUTES } from "src/consts/routes";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | undefined>;
};

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL, // {API_ROOT}/api, e.g. https://janehbymanoush.com/api
  headers: {
    "Content-Type": "application/json",
  },
});

const isAdminAuthEndpoint = (url?: string): boolean =>
  Boolean(url && (url.includes("/v1/admin/auth/login") || url.includes("/v1/admin/auth/refresh")));

// Add Bearer token for admin API requests (except login/refresh); allow FormData to set Content-Type
apiClient.interceptors.request.use((config) => {
  if (config.url?.includes("/v1/admin/") && !isAdminAuthEndpoint(config.url)) {
    const token = getAdminAccessToken() || ENV.ADMIN_BEARER_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

// Redirect to admin login if an admin API receives a 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.config?.url?.includes("/v1/admin/") &&
      !isAdminAuthEndpoint(error.config?.url) &&
      window.location.pathname !== ROUTES.ADMIN_LOGIN
    ) {
      clearAdminTokens();
      window.location.href = ROUTES.ADMIN_LOGIN;
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: {
    code?: string;
    message?: string;
    details?: string[];
  } | null;
}

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers, params } = options;

  const response = await apiClient.request<ApiResponse<T>>({
    url: path,
    method,
    headers,
    params,
    data: body,
  });

  if (response.data && typeof response.data === "object" && "success" in response.data) {
    if (!response.data.success) {
      throw new Error(response.data.error?.message || "API Error");
    }
    return response.data.data;
  }

  // Fallback in case some endpoints don't use the wrapper yet
  return response.data as unknown as T;
}
