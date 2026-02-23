import axios from "axios";
import { ENV } from "src/config/env";
import { getAdminAccessToken } from "src/api/adminAuthStorage";

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

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers, params } = options;

  const response = await apiClient.request<T>({
    url: path,
    method,
    headers,
    params,
    data: body,
  });

  return response.data;
}
