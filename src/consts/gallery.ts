/** CloudFront base URL for storefront static assets. */
export const staticUrl = (filename: string): string =>
  `https://dfgkytohsu2cm.cloudfront.net/static_new/${encodeURIComponent(filename)}`;

/** Info page hero images (ring size, shipping, care, gift cards). */
export const CF_INFO_RING_SIZE = staticUrl("մատանա չափսի մասը.webp");
export const CF_INFO_SHIPPING = staticUrl("առաքում.webp");
export const CF_RETURN_NEW = staticUrl("Return.webp");
export const CF_INFO_CARE = staticUrl("զարդերի խնամքի հատված.webp");
export const CF_INFO_GIFT_CARDS = staticUrl("Նվեր քարտ.webp");

/** Contact page studio photo. */
export const CF_CONTACT_STUDIO = staticUrl("Կապ մեզ հետ.webp");

/** About page CTA background. */
export const CF_ABOUT_CTA = staticUrl("About us վերջին հատվածում.webp");

/** About → Values section. */
export const CF_VALUES_SUSTAINABILITY = staticUrl("Без имени-34.webp");
export const CF_VALUES_EXPRESSION  = staticUrl("Heritage.webp");
export const CF_VALUES_QUALITY = staticUrl("Craftsmanship.webp");

/** About → Craft section. */
export const CF_CRAFT_HANDICRAFT = staticUrl("IMG_9117.webp");
export const CF_CRAFT_DESIGN = staticUrl("IMG_9132.webp");
export const CF_CRAFT_COLLECTIONS = staticUrl("IMG_9116.webp");

/** Original home / drawer gallery stills. */
export const CF_GALLERY_1 = staticUrl("Նրբություն.webp");
export const CF_GALLERY_2 = staticUrl("Copy of IMG_6971.webp");
export const CF_GALLERY_3 = staticUrl("Copy of final val janeh 2.webp");
export const CF_GALLERY_4 = staticUrl("Copy of janeh heart4.webp");
export const CF_GALLERY_5 = staticUrl("Copy of Copy of IMG_9953.webp");
export const CF_GALLERY_6 = staticUrl("Copy of jane heart 1.webp");
export const CF_GALLERY_7 = staticUrl("Copy of Copy of IMG_9707.webp");
export const CF_GALLERY_8 = staticUrl("Copy of couple 1.webp");
export const CF_GALLERY_9 = staticUrl("Copy of IMG_2871 (1).webp");
export const CF_GALLERY_10 = staticUrl("Copy of Janeh chr 1.webp");
export const CF_GALLERY_11 = staticUrl("Copy of janeh chr 2.webp");
export const CF_GALLERY_12 = staticUrl("IMG_0330 (1).webp");

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
