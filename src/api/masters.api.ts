import { http } from "src/api/http";
import type { MastersPublicResponse } from "src/types/master";

const MASTERS_PUBLIC_PATH = "/v1/masters";

/** Public catalog of makers (active / visible items per server rules) */
export const getMasters = (): Promise<MastersPublicResponse> =>
  http<MastersPublicResponse>(MASTERS_PUBLIC_PATH);
