import { useState } from "react";
import { Layout, Drawer, Button, Dropdown, Flex } from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/consts/routes";
import { LANGUAGES } from "@/i18n";
import { LOGO_IMAGE } from "@/consts/assets";
import Footer from "@/components/Footer/Footer";
import styles from "./AppLayout.module.css";

const { Header, Content } = Layout;

const AppLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const leftNavItems = [
    { path: ROUTES.CATALOG, labelKey: "nav.collection" },
    { path: ROUTES.WOMEN, labelKey: "nav.woman" },
    { path: ROUTES.MEN, labelKey: "nav.man" },
  ];

  const rightNavItems = [
    { path: ROUTES.HOME, labelKey: "nav.newProducts" },
    { path: ROUTES.ABOUT, labelKey: "nav.about" },
    { path: ROUTES.CONTACT, labelKey: "nav.contact" },
  ];
  const contactItem = rightNavItems[rightNavItems.length - 1];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  const langMenuItems = LANGUAGES.map((lang) => ({
    key: lang.code,
    label: lang.label,
    disabled: i18n.language === lang.code,
  }));

  const handleMenuClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLanguageChange = ({ key }: { key: string }) => {
    void i18n.changeLanguage(key);
  };

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === i18n.language)?.label ?? "EN";

  const isActive = (path: string) =>
    path === ROUTES.HOME ? location.pathname === path : location.pathname.startsWith(path);

  const NavLink: React.FC<{ path: string; labelKey: string }> = ({
    path,
    labelKey,
  }) => (
    <Link
      to={path}
      className={isActive(path) ? styles.navLinkActive : styles.navLink}
    >
      {t(labelKey)}
    </Link>
  );

  return (
    <Layout>
      <Header className={styles.header}>
        <span className={styles.headerSpacer} aria-hidden />
        {leftNavItems.map((item) => (
          <NavLink key={item.path} path={item.path} labelKey={item.labelKey} />
        ))}
        <Link to={ROUTES.HOME} className={styles.logoWrap}>
          <img src={LOGO_IMAGE} alt={t("common.appName")} className={styles.logoImg} />
        </Link>
        {rightNavItems.slice(0, -1).map((item) => (
          <NavLink key={item.path} path={item.path} labelKey={item.labelKey} />
        ))}
        <Flex align="center" gap="small" className={styles.contactWithLang}>
          {contactItem && (
            <NavLink path={contactItem.path} labelKey={contactItem.labelKey} />
          )}
          <Dropdown
            className={styles.headerLangWrap}
            menu={{ items: langMenuItems, onClick: handleLanguageChange }}
            placement="bottomRight"
            dropdownRender={(menu) => (
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
          onClick={() => setDrawerOpen(true)}
          aria-label={t("nav.openMenu")}
        />
        <Drawer
          title={
            <img
              src={LOGO_IMAGE}
              alt={t("common.appName")}
              className={styles.drawerLogo}
            />
          }
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          classNames={{ header: styles.drawerHeader, body: styles.drawerBody }}
          styles={{ body: { overflow: "hidden" } }}
        >
          <nav className={styles.drawerNav}>
            {allNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  isActive(item.path)
                    ? styles.drawerLinkActive
                    : styles.drawerLink
                }
                onClick={() => handleMenuClick(item.path)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <Dropdown
            menu={{ items: langMenuItems, onClick: handleLanguageChange }}
            placement="bottomLeft"
            dropdownRender={(menu) => (
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
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
