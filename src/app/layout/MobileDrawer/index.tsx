import { Drawer } from "antd";
import { Link } from "react-router-dom";
import GalleryRow from "src/components/GalleryRow";
import type { MobileDrawerProps } from "./types";
import styles from "./styles.module.css";

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  items,
  isActive,
  t,
  onNavClick,
  logoUrl,
  logoAlt,
}) => (
  <Drawer
    title={
      <img src={logoUrl} alt={logoAlt} className={styles.drawerLogo} />
    }
    placement="left"
    onClose={onClose}
    open={open}
    classNames={{ header: styles.drawerHeader, body: styles.drawerBody }}
    styles={{ body: { overflow: "hidden" } }}
  >
    <nav className={styles.drawerNav}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={
            isActive(item.path) ? styles.drawerLinkActive : styles.drawerLink
          }
          onClick={() => onNavClick(item.path)}
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
    <div className={styles.drawerGallery}>
      <GalleryRow />
    </div>
  </Drawer>
);

export default MobileDrawer;
