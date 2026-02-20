/** API root (no trailing slash). All APIs are called as {API_ROOT}/api/... */
export const ENV = {
  API_ROOT:
    import.meta.env.VITE_API_ROOT ?? "http://213.199.46.0",
  get API_BASE_URL(): string {
    return `${this.API_ROOT}/api`;
  },
  /** Bearer token for admin API requests (/v1/admin/*). Set VITE_ADMIN_BEARER_TOKEN in .env */
  ADMIN_BEARER_TOKEN:
    import.meta.env.VITE_ADMIN_BEARER_TOKEN ?? "",
} as const;
