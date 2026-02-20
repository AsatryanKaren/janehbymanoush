import { ROUTES } from "@/consts/routes";

/** Footer link item: i18n key for label, optional path (omit for external or no link) */
export interface FooterLinkItem {
  i18nKey: string;
  path?: string;
}

/** Footer address item: i18n key for the address text */
export interface FooterAddressItem {
  i18nKey: string;
}

/** Purchases column links */
export const FOOTER_PURCHASES_LINKS: FooterLinkItem[] = [
  { i18nKey: "footer.purchases.ringSizeGuide", path: "/ring-size-guide" },
  { i18nKey: "footer.purchases.giftCards", path: "/gift-cards" },
  { i18nKey: "footer.purchases.shippingReturns", path: "/shipping" },
  { i18nKey: "footer.purchases.careInstructions", path: "/care" },
];

/** About column links */
export const FOOTER_ABOUT_LINKS: FooterLinkItem[] = [
  { i18nKey: "footer.about.philosophy", path: ROUTES.ABOUT },
  { i18nKey: "footer.about.heritage", path: ROUTES.ABOUT },
  { i18nKey: "footer.about.contactUs", path: ROUTES.CONTACT },
];

/** Addresses column items */
export const FOOTER_ADDRESSES: FooterAddressItem[] = [
  { i18nKey: "footer.addresses.rio" },
  { i18nKey: "footer.addresses.nubar" },
  { i18nKey: "footer.addresses.serevn" },
];
