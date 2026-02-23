import { ROUTES } from "src/consts/routes";

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
  { path: ROUTES.HOME, labelKey: "nav.newProducts" },
  { path: ROUTES.ABOUT, labelKey: "nav.about" },
  { path: ROUTES.CONTACT, labelKey: "nav.contact" },
];

export const ALL_NAV_ITEMS: NavItem[] = [...LEFT_NAV_ITEMS, ...RIGHT_NAV_ITEMS];
