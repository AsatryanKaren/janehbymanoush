/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API root, e.g. http://213.199.46.0. Requests go to {VITE_API_ROOT}/api/... */
  readonly VITE_API_ROOT?: string;
  /** JWT Bearer token for /v1/admin/* API requests */
  readonly VITE_ADMIN_BEARER_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
