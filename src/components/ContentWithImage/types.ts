export type ContentWithImageReferenceLink = {
  href: string;
  label: string;
};

export type ContentWithImageProps = {
  title: string;
  paragraphs: string[];
  /** When set, rendered as a highlighted tip list above regular paragraphs. */
  bullets?: string[];
  /** Short label above the tip list (e.g. i18n `care.tipsHeading`). */
  tipsHeading?: string;
  /** Optional closing line (e.g. signature), styled separately from body copy. */
  signOff?: string;
  /** Optional citation link below the tip list (e.g. official legal register). */
  referenceLink?: ContentWithImageReferenceLink;
  imageUrl: string;
  imageAlt?: string;
};
