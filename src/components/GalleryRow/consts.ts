const staticUrl = (filename: string): string =>
  `https://dfgkytohsu2cm.cloudfront.net/static_new/${encodeURIComponent(filename)}`;

export const IMAGES = [
  staticUrl("Նրբություն.webp"),
  staticUrl("Copy of IMG_6971.webp"),
  staticUrl("Copy of final val janeh 2.webp"),
  staticUrl("Copy of janeh heart4.webp"),
  staticUrl("Copy of Copy of IMG_9953.webp"),
  staticUrl("Copy of jane heart 1.webp"),
];
