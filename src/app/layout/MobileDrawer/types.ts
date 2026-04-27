import type { NavItem } from "../consts";

export type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  isActive: (path: string) => boolean;
  t: (key: string) => string;
  onNavClick: (path: string) => void;
  logoUrl: string;
  logoAlt: string;
  homePath: string;
};
