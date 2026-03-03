import { http } from "src/api/http";
import type { BestsellersResponse } from "src/types/product";

const BESTSELLERS_PATH = "/v1/bestsellers";

/** GET /v1/bestsellers — list of bestseller/featured products for home. */
export function getBestsellers(): Promise<BestsellersResponse> {
  return http<BestsellersResponse>(BESTSELLERS_PATH);
}
