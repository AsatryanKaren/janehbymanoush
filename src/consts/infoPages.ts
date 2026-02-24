/**
 * Config for info pages: ring-size-guide, shipping, care.
 * Each has an i18n section key, title key, body paragraph keys, and image URL.
 */
export const INFO_PAGES = {
  "ring-size-guide": {
    sectionKey: "ringSizeGuide",
    titleKey: "ringSizeGuide.title",
    bodyKeys: [
      "ringSizeGuide.intro",
      "ringSizeGuide.howTo",
      "ringSizeGuide.tips",
    ],
    image:
      "https://images.unsplash.com/photo-1605101100278-5d32d15a3e8e?w=600&q=80",
  },
  shipping: {
    sectionKey: "shipping",
    titleKey: "shipping.title",
    bodyKeys: [
      "shipping.intro",
      "shipping.options",
      "shipping.tracking",
    ],
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
  },
  care: {
    sectionKey: "care",
    titleKey: "care.title",
    bodyKeys: [
      "care.intro",
      "care.storage",
      "care.cleaning",
    ],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
} as const;

export type InfoPageSlug = keyof typeof INFO_PAGES;
