import { http } from "src/api/http";
import type { BannerContent } from "src/types/banner";

const BANNER_CONTENT_PATH = "/v1/banner-content";

/** Public GET — current home banner media URL and type */
export function getBannerContent(): Promise<BannerContent> {
  return http<BannerContent>(BANNER_CONTENT_PATH);
}
