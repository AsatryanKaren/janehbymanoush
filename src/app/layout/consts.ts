import { ROUTES } from "src/consts/routes";

/** Routes where the main content has no top padding (e.g. full-bleed banner). */
export const ROUTES_WITHOUT_CONTENT_PADDING_TOP: string[] = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.RING_SIZE_GUIDE,
  ROUTES.SHIPPING,
  ROUTES.CARE,
  ROUTES.GIFT_CARDS,
];

/** Routes where content has 24px padding-top on mobile (others keep 48px). */
export const ROUTES_WITH_REDUCED_CONTENT_PADDING_TOP_MOBILE: string[] = [
  ROUTES.CATALOG,
  ROUTES.WOMEN,
  ROUTES.MEN,
  ROUTES.NEW,
];

export type NavItem = {
  path: string;
  labelKey: string;
};

export const LEFT_NAV_ITEMS: NavItem[] = [
  { path: ROUTES.CATALOG, labelKey: "nav.collection" },
  { path: ROUTES.WOMEN, labelKey: "nav.woman" },
  { path: ROUTES.MEN, labelKey: "nav.man" },
];

export const RIGHT_NAV_ITEMS: NavItem[] = [
  { path: ROUTES.NEW, labelKey: "nav.newProducts" },
  { path: ROUTES.ABOUT, labelKey: "nav.about" },
  { path: ROUTES.CONTACT, labelKey: "nav.contact" },
];

export const ALL_NAV_ITEMS: NavItem[] = [...LEFT_NAV_ITEMS, ...RIGHT_NAV_ITEMS];
