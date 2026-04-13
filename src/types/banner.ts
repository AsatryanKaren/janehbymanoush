/** GET /v1/banner-content and POST /v1/admin/banner-content response body */
export type BannerContent = {
  url: string;
  isVideo: boolean;
};

/** POST /v1/admin/banner-content — multipart `file` upload */
export type BannerContentUploadResponse = BannerContent;
