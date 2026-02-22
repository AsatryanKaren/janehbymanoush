import type { NavItem } from "../consts";

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  isActive: (path: string) => boolean;
  t: (key: string) => string;
  onNavClick: (path: string) => void;
  langMenuItems: { key: string; label: string; disabled: boolean }[];
  currentLangLabel: string;
  onLanguageChange: (opts: { key: string }) => void;
  logoUrl: string;
  logoAlt: string;
}
