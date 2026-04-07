const staticUrl = (filename: string): string =>
  `https://dfgkytohsu2cm.cloudfront.net/static/${encodeURIComponent(filename)}`;

export const IMAGES = [
  staticUrl("Նրբություն.png"),
  staticUrl("Copy of IMG_6971.JPG"),
  staticUrl("Copy of final val janeh 2.png"),
  staticUrl("Copy of janeh heart4.png"),
  staticUrl("Copy of Copy of IMG_9953.jpg"),
  staticUrl("Copy of jane heart 1.png"),
];
