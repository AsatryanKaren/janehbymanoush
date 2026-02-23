import { Layout, Menu } from "antd";
import {
  ShoppingOutlined,
  FolderOutlined,
  TagsOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "src/app/providers/AdminAuthProvider";
import AdminCategoriesProvider from "src/app/providers/AdminCategoriesProvider";
import AdminCollectionsProvider from "src/app/providers/AdminCollectionsProvider";
import { ROUTES } from "src/consts/routes";
import { LOGO_IMAGE } from "src/consts/assets";
import { useAdminTranslation } from "./useAdminTranslation";
import styles from "./styles.module.css";

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const { t } = useAdminTranslation();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: ROUTES.ADMIN_PRODUCTS,
      icon: <ShoppingOutlined />,
      label: t("admin.products"),
    },
    {
      key: ROUTES.ADMIN_COLLECTIONS,
      icon: <FolderOutlined />,
      label: t("admin.collections.title"),
    },
    {
      key: ROUTES.ADMIN_CATEGORIES,
      icon: <TagsOutlined />,
      label: t("admin.categories.title"),
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
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("admin.logout"),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      logout();
      navigate(ROUTES.ADMIN_LOGIN, { replace: true });
    } else {
      navigate(key);
    }
  };

  return (
    <AdminCategoriesProvider>
      <AdminCollectionsProvider>
        <Layout className={styles.root}>
        <Sider className={styles.sider} breakpoint="lg" collapsedWidth="0">
          <Link to={ROUTES.ADMIN_PRODUCTS} className={styles.logo}>
            <img src={LOGO_IMAGE} alt={t("admin.panelTitle")} />
          </Link>
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
      </AdminCollectionsProvider>
    </AdminCategoriesProvider>
  );
};

export default AdminLayout;
