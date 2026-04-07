import {
  CF_INFO_CARE,
  CF_INFO_GIFT_CARDS,
  CF_INFO_RING_SIZE,
  CF_INFO_SHIPPING,
} from "src/consts/gallery";

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
    image: CF_INFO_RING_SIZE,
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
    image: CF_INFO_SHIPPING,
  },
  returns: {
    sectionKey: "returns",
    titleKey: "returns.title",
    bulletCount: 4,
    bodyKeys: [
      "returns.bullet1",
      "returns.bullet2",
      "returns.bullet3",
      "returns.bullet4",
    ],
    image: CF_INFO_SHIPPING,
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
    image: CF_INFO_CARE,
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
    image: CF_INFO_GIFT_CARDS,
  },
} as const;

export type InfoPageSlug = keyof typeof INFO_PAGES;
