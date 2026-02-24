/// <reference types="vite/client" />

declare module "*.png" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  /** API root, e.g. https://janehbymanoush.com. Requests go to {VITE_API_ROOT}/api/... */
  readonly VITE_API_ROOT?: string;
  /** JWT Bearer token for /v1/admin/* API requests */
  readonly VITE_ADMIN_BEARER_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
