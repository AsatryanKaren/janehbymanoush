import axios from "axios";
import { ENV } from "@/config/env";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | undefined>;
}

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
