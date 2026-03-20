/**
 * Config for info pages: ring-size-guide, shipping, returns, care, gift-cards.
 * Each has an i18n section key, title key, body paragraph keys, and image URL.
 */
export const INFO_PAGES = {
  "ring-size-guide": {
    sectionKey: "ringSizeGuide",
    titleKey: "ringSizeGuide.title",
    bulletCount: 4,
    bodyKeys: [
      "ringSizeGuide.bullet1",
      "ringSizeGuide.bullet2",
      "ringSizeGuide.bullet3",
      "ringSizeGuide.bullet4",
    ],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
  shipping: {
    sectionKey: "shipping",
    titleKey: "shipping.title",
    bulletCount: 6,
    bodyKeys: [
      "shipping.bullet1",
      "shipping.bullet2",
      "shipping.bullet3",
      "shipping.bullet4",
      "shipping.bullet5",
      "shipping.bullet6",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  returns: {
    sectionKey: "returns",
    titleKey: "returns.title",
    bulletCount: 3,
    bodyKeys: [
      "returns.bullet1",
      "returns.bullet2",
      "returns.bullet3",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  care: {
    sectionKey: "care",
    titleKey: "care.title",
    /** First N `bodyKeys` render as a styled tip list; remainder are prose + sign-off. */
    bulletCount: 5,
    bodyKeys: [
      "care.bullet1",
      "care.bullet2",
      "care.bullet3",
      "care.bullet4",
      "care.bullet5",
      "care.closing",
      "care.signOff",
    ],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  "gift-cards": {
    sectionKey: "giftCards",
    titleKey: "giftCards.title",
    bulletCount: 4,
    bodyKeys: [
      "giftCards.bullet1",
      "giftCards.bullet2",
      "giftCards.bullet3",
      "giftCards.bullet4",
    ],
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80",
  },
} as const;

export type InfoPageSlug = keyof typeof INFO_PAGES;
