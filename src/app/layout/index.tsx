import { useState, useMemo } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { LANGUAGES } from "src/i18n";
import { LOGO_IMAGE } from "src/consts/assets";
import { LEFT_NAV_ITEMS, RIGHT_NAV_ITEMS, ALL_NAV_ITEMS } from "./consts";
import Header from "./Header";
import MobileDrawer from "./MobileDrawer";
import Footer from "src/components/Footer";
import styles from "./styles.module.css";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const langMenuItems = LANGUAGES.map((lang) => ({
    key: lang.code,
    label: lang.label,
    disabled: i18n.language === lang.code,
  }));
  const currentLangLabel =
    LANGUAGES.find((l) => l.code === i18n.language)?.label ?? "EN";

  const isActive = (path: string) =>
    path === ROUTES.HOME
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const handleNavClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isCatalogRoute = useMemo(() => {
    const p = location.pathname;
    return (
      p === ROUTES.CATALOG ||
      p === ROUTES.WOMEN ||
      p === ROUTES.MEN ||
      p.startsWith(ROUTES.CATALOG + "/")
    );
  }, [location.pathname]);

  const contentClassName = isCatalogRoute
    ? `${styles.content} ${styles.contentDark}`
    : styles.content;

  return (
    <Layout>
      <Header
        leftItems={LEFT_NAV_ITEMS}
        rightItems={RIGHT_NAV_ITEMS}
        langMenuItems={langMenuItems}
        currentLangLabel={currentLangLabel}
        isActive={isActive}
        t={t}
        onLanguageChange={({ key }) => void i18n.changeLanguage(key)}
        onOpenMenu={() => setDrawerOpen(true)}
        logoUrl={LOGO_IMAGE}
        logoAlt={t("common.appName")}
        homePath={ROUTES.HOME}
      />
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={ALL_NAV_ITEMS}
        isActive={isActive}
        t={t}
        onNavClick={handleNavClick}
        langMenuItems={langMenuItems}
        currentLangLabel={currentLangLabel}
        onLanguageChange={({ key }) => void i18n.changeLanguage(key)}
        logoUrl={LOGO_IMAGE}
        logoAlt={t("common.appName")}
      />
      <Content className={contentClassName}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
