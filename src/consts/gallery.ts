/** CloudFront base URL for storefront static assets. */
export const staticUrl = (filename: string): string =>
  `https://dfgkytohsu2cm.cloudfront.net/static/${encodeURIComponent(filename)}`;

/** Info page hero images (ring size, shipping, care, gift cards). */
export const CF_INFO_RING_SIZE = staticUrl("մատանա չափսի մասը.png");
export const CF_INFO_SHIPPING = staticUrl("առաքում.JPEG");
export const CF_INFO_CARE = staticUrl("զարդերի խնամքի հատված.jpg");
export const CF_INFO_GIFT_CARDS = staticUrl("Նվեր քարտ.jpg");

/** Contact page studio photo. */
export const CF_CONTACT_STUDIO = staticUrl("Կապ մեզ հետ.JPG");

/** About page CTA background. */
export const CF_ABOUT_CTA = staticUrl("About us վերջին հատվածում.JPG");

/** About → Values section. */
export const CF_VALUES_QUALITY = staticUrl("IMG_9117.JPG");
export const CF_VALUES_SUSTAINABILITY = staticUrl("IMG_9132.JPG");
export const CF_VALUES_EXPRESSION = staticUrl("IMG_9116.JPG");

/** About → Craft section. */
export const CF_CRAFT_HANDICRAFT = staticUrl("IMG_9117.JPG");
export const CF_CRAFT_DESIGN = staticUrl("IMG_9132.JPG");
export const CF_CRAFT_COLLECTIONS = staticUrl("IMG_9116.JPG");

/** Original home / drawer gallery stills. */
export const CF_GALLERY_1 = staticUrl("Նրբություն.png");
export const CF_GALLERY_2 = staticUrl("Copy of IMG_6971.JPG");
export const CF_GALLERY_3 = staticUrl("Copy of final val janeh 2.png");
export const CF_GALLERY_4 = staticUrl("Copy of janeh heart4.png");
export const CF_GALLERY_5 = staticUrl("Copy of Copy of IMG_9953.jpg");
export const CF_GALLERY_6 = staticUrl("Copy of jane heart 1.png");
export const CF_GALLERY_7 = staticUrl("Copy of Copy of IMG_9707.jpg");
export const CF_GALLERY_8 = staticUrl("Copy of couple 1.png");
export const CF_GALLERY_9 = staticUrl("Copy of IMG_2871 (1).JPG");
export const CF_GALLERY_10 = staticUrl("Copy of Janeh chr 1.png");
export const CF_GALLERY_11 = staticUrl("Copy of janeh chr 2.png");
export const CF_GALLERY_12 = staticUrl("IMG_0330 (1).JPG");

/**
 * Home page + mobile drawer horizontal strip — jewelry / lifestyle stills only.
 */
export const GALLERY_STRIP_IMAGES = [
  CF_GALLERY_1,
  CF_GALLERY_2,
  CF_GALLERY_3,
  CF_GALLERY_4,
  CF_GALLERY_5,
  CF_GALLERY_6,
  CF_GALLERY_7,
  CF_GALLERY_8,
  CF_GALLERY_9,
  CF_GALLERY_10,
  CF_GALLERY_11,
  CF_GALLERY_12,
] as const;

/**
 * Full `/gallery` route — strip stills plus imagery used on info, contact, and about.
 */
export const GALLERY_PAGE_IMAGES = [
  ...GALLERY_STRIP_IMAGES,
  CF_INFO_RING_SIZE,
  CF_INFO_SHIPPING,
  CF_INFO_CARE,
  CF_INFO_GIFT_CARDS,
  CF_CONTACT_STUDIO,
  CF_ABOUT_CTA,
  CF_VALUES_QUALITY,
  CF_VALUES_SUSTAINABILITY,
  CF_VALUES_EXPRESSION,
  CF_CRAFT_HANDICRAFT,
  CF_CRAFT_DESIGN,
  CF_CRAFT_COLLECTIONS,
] as const;
