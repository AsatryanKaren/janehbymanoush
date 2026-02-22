import { Layout, Button, Dropdown, Flex } from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { HeaderProps } from "./types";
import styles from "./styles.module.css";

const { Header: AntHeader } = Layout;

const Header: React.FC<HeaderProps> = ({
  leftItems,
  rightItems,
  langMenuItems,
  currentLangLabel,
  isActive,
  t,
  onLanguageChange,
  onOpenMenu,
  logoUrl,
  logoAlt,
  homePath,
}) => {
  const contactItem = rightItems[rightItems.length - 1];
  const rightLinks = rightItems.slice(0, -1);

  const NavLink: React.FC<{ path: string; labelKey: string }> = ({
    path,
    labelKey,
  }) => (
    <Link
      to={path}
      className={isActive(path) ? styles.navLinkActive : styles.navLink}
      data-label={t(labelKey)}
    >
      {t(labelKey)}
    </Link>
  );

  return (
    <AntHeader className={styles.header}>
      <span className={styles.headerSpacer} aria-hidden />
      {leftItems.map((item) => (
        <NavLink key={item.path} path={item.path} labelKey={item.labelKey} />
      ))}
      <Link to={homePath} className={styles.logoWrap}>
        <img src={logoUrl} alt={logoAlt} className={styles.logoImg} />
      </Link>
      {rightLinks.map((item) => (
        <NavLink key={item.path} path={item.path} labelKey={item.labelKey} />
      ))}
      <Flex align="center" gap="small" className={styles.contactWithLang}>
        {contactItem && (
          <NavLink path={contactItem.path} labelKey={contactItem.labelKey} />
        )}
        <Dropdown
          className={styles.headerLangWrap}
          menu={{ items: langMenuItems, onClick: onLanguageChange }}
          placement="bottomRight"
          popupRender={(menu) => (
            <div className={styles.dropdownOverlay}>{menu}</div>
          )}
        >
          <Button
            type="text"
            icon={<GlobalOutlined />}
            className={styles.langButton}
            aria-label={currentLangLabel}
          />
        </Dropdown>
      </Flex>
      <Button
        className={styles.menuButton}
        type="text"
        icon={<MenuOutlined />}
        onClick={onOpenMenu}
        aria-label={t("nav.openMenu")}
      />
    </AntHeader>
  );
};

export default Header;
