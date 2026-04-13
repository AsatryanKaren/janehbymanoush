import { http } from "src/api/http";
import type { BannerContent } from "src/types/banner";

const ADMIN_BANNER_CONTENT_PATH = "/v1/admin/banner-content";

export const adminBannerContentApi = {
  /** POST multipart/form-data with field `file` (image or video). */
  upload: (file: File): Promise<BannerContent> => {
    const formData = new FormData();
    formData.append("file", file);
    return http<BannerContent>(ADMIN_BANNER_CONTENT_PATH, {
      method: "POST",
      body: formData,
    });
  },
};
