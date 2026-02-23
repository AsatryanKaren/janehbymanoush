import type { NavItem } from "../consts";

export type HeaderProps = {
  leftItems: NavItem[];
  rightItems: NavItem[];
  langMenuItems: { key: string; label: string; disabled: boolean }[];
  currentLangLabel: string;
  isActive: (path: string) => boolean;
  t: (key: string) => string;
  onLanguageChange: (opts: { key: string }) => void;
  onOpenMenu: () => void;
  logoUrl: string;
  logoAlt: string;
  homePath: string;
};
