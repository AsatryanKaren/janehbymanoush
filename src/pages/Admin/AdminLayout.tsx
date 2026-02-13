import { Layout, Menu, Typography } from "antd";
import {
  ShoppingOutlined,
  FileTextOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/consts/routes";
import styles from "./AdminLayout.module.css";

const { Sider, Content } = Layout;
const { Text } = Typography;

export const AdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: ROUTES.ADMIN_PRODUCTS,
      icon: <ShoppingOutlined />,
      label: t("admin.products"),
    },
    {
      key: ROUTES.ADMIN_ORDERS,
      icon: <FileTextOutlined />,
      label: t("admin.orders"),
    },
    {
      key: ROUTES.HOME,
      icon: <HomeOutlined />,
      label: t("admin.backToSite"),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout>
      <Sider className={styles.sider} breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo}>
          <Text strong className={styles.logoText}>
            {t("admin.panelTitle")}
          </Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
