import { staticUrl } from "./gallery";

/**
 * Home + mobile drawer gallery: exactly **3 sets × 6 images** (CloudFront
 * `static_new/` filenames). On each full page load one set is chosen at random
 * and reused for every `GalleryRow` in that session (home + drawer).
 */
export const HOME_GALLERY_STRIP_SETS = [
  [
    "IMG_9718.webp",
    "Copy of IMG_6971.webp",
    "Copy of final val janeh 2.webp",
    "9Y0A9701.webp",
    "Copy of Copy of IMG_9953.webp",
    "Copy of jane heart 1.webp",
  ],
  // Set 2: five filenames were supplied; sixth repeats `05` until a sixth file name is available.
  [
    "01 janeh bordo 2.webp",
    "06 RR9Y0A9807.webp",
    "02 IMG_7227.webp",
    "05 IMG_7218.webp",
    "03 RR9Y0A5888.webp",
    "04 IMG_7230.webp",
  ],
  [
    "01 of 9Y0A0041.webp",
    "02 of 9Y0A0078.webp",
    "03 of 9Y0A0074.webp",
    "04of 9Y0A9968.webp",
    "05 of IMG_2442.webp",
    "06 of 9Y0A0053.webp",
  ],
] as const satisfies readonly [
  readonly [string, string, string, string, string, string],
  readonly [string, string, string, string, string, string],
  readonly [string, string, string, string, string, string],
];

let cachedHomeGalleryStripUrls: string[] | null = null;

/** Same strip for every `GalleryRow` in the session (e.g. home + drawer). */
export const getHomeGalleryStripUrls = (): string[] => {
  if (cachedHomeGalleryStripUrls !== null) {
    return cachedHomeGalleryStripUrls;
  }

  const index = Math.floor(Math.random() * HOME_GALLERY_STRIP_SETS.length);
  const chosen = HOME_GALLERY_STRIP_SETS[index] ?? HOME_GALLERY_STRIP_SETS[0];

  cachedHomeGalleryStripUrls = chosen.map((filename) => staticUrl(filename));
  return cachedHomeGalleryStripUrls;
};
