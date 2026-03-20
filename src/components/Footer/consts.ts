import { ROUTES } from "src/consts/routes";

/** Footer link item: i18n key for label, optional path (omit for external or no link) */
export type FooterLinkItem = {
  i18nKey: string;
  path?: string;
};

/** Footer address item: i18n key for the address text, Google Maps query to open in Maps */
export type FooterAddressItem = {
  i18nKey: string;
  mapsQuery: string;
};

const toMapsUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** Help & information column (guides, care) */
export const FOOTER_HELP_LINKS: FooterLinkItem[] = [
  { i18nKey: "footer.help.ringSizeGuide", path: "/ring-size-guide" },
  { i18nKey: "footer.help.careInstructions", path: "/care" },
  { i18nKey: "footer.help.giftCards", path: "/gift-cards" },
];

/** About column links */
export const FOOTER_ABOUT_LINKS: FooterLinkItem[] = [
  { i18nKey: "footer.about.contactUs", path: ROUTES.CONTACT },
  { i18nKey: "footer.about.shipping", path: ROUTES.SHIPPING },
  { i18nKey: "footer.about.returns", path: ROUTES.RETURNS },
];

/** Addresses column items – mapsQuery used for Google Maps link */
export const FOOTER_ADDRESSES: FooterAddressItem[] = [
  {
    i18nKey: "footer.addresses.rio",
    mapsQuery: "Rio Mall, Papazyan 8, 2nd floor, Yerevan, Armenia",
  },
  {
    i18nKey: "footer.addresses.nubar",
    mapsQuery: "Nubar restaurant, Vardanants 18/2, Yerevan, Armenia",
  },
  {
    i18nKey: "footer.addresses.serevn",
    mapsQuery: "SER.EVN, Moskovyan 31, Yerevan, Armenia",
  },
];

export { toMapsUrl };
