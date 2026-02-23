import axios from "axios";
import { ENV } from "src/config/env";

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

// Add Bearer token for admin API requests; allow FormData to set Content-Type
apiClient.interceptors.request.use((config) => {
  if (ENV.ADMIN_BEARER_TOKEN && config.url?.includes("/v1/admin/")) {
    config.headers.Authorization = `Bearer ${ENV.ADMIN_BEARER_TOKEN}`;
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
