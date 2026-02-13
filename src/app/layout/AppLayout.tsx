import { useState } from "react";
import { Layout, Menu, Drawer, Button, Dropdown, Flex } from "antd";
import { MenuOutlined, GlobalOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/consts/routes";
import { LANGUAGES } from "@/i18n";
import styles from "./AppLayout.module.css";

const { Header, Content, Footer } = Layout;

export const AppLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { key: ROUTES.HOME, label: t("nav.home") },
    { key: ROUTES.WOMEN, label: t("nav.women") },
    { key: ROUTES.MEN, label: t("nav.men") },
    { key: ROUTES.ABOUT, label: t("nav.about") },
    { key: ROUTES.CONTACT, label: t("nav.contact") },
  ];

  const langMenuItems = LANGUAGES.map((lang) => ({
    key: lang.code,
    label: lang.label,
    disabled: i18n.language === lang.code,
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setDrawerOpen(false);
  };

  const handleLanguageChange = ({ key }: { key: string }) => {
    void i18n.changeLanguage(key);
  };

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === i18n.language)?.label ?? "EN";

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>{t("common.appName")}</div>
        <Flex align="center" gap={8} flex={1} justify="flex-end">
          <Menu
            className={styles.desktopMenu}
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={navItems}
            onClick={handleMenuClick}
          />
          <Dropdown
            menu={{ items: langMenuItems, onClick: handleLanguageChange }}
            placement="bottomRight"
          >
            <Button type="text" icon={<GlobalOutlined />} size="small">
              {currentLangLabel}
            </Button>
          </Dropdown>
          <Button
            className={styles.menuButton}
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            aria-label={t("nav.openMenu")}
          />
        </Flex>
        <Drawer
          title={t("common.appName")}
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={navItems}
            onClick={handleMenuClick}
          />
          <Dropdown
            menu={{ items: langMenuItems, onClick: handleLanguageChange }}
            placement="bottomLeft"
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
      <Footer className={styles.footer}>
        {t("common.footer", {
          appName: t("common.appName"),
          year: new Date().getFullYear(),
        })}
      </Footer>
    </Layout>
  );
};
