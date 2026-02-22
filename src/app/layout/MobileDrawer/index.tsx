import { Drawer, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { MobileDrawerProps } from "./types";
import styles from "./styles.module.css";

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  items,
  isActive,
  t,
  onNavClick,
  langMenuItems,
  currentLangLabel,
  onLanguageChange,
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
    <Dropdown
      menu={{ items: langMenuItems, onClick: onLanguageChange }}
      placement="bottomLeft"
      popupRender={(menu) => (
        <div className={styles.dropdownOverlay}>{menu}</div>
      )}
    >
      <Button
        type="text"
        icon={<GlobalOutlined />}
        className={styles.drawerLangButton}
      >
        {currentLangLabel}
      </Button>
    </Dropdown>
  </Drawer>
);

export default MobileDrawer;
