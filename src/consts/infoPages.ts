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
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
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
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
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
  "gift-cards": {
    sectionKey: "giftCards",
    titleKey: "giftCards.title",
    bodyKeys: [
      "giftCards.intro",
      "giftCards.howItWorks",
      "giftCards.contact",
    ],
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80",
  },
} as const;

export type InfoPageSlug = keyof typeof INFO_PAGES;
