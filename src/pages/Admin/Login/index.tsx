import { App, Button, Card, Form, Input } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "src/app/providers/AdminAuthProvider";
import { ROUTES } from "src/consts/routes";
import { LOGO_IMAGE } from "src/consts/assets";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import styles from "./styles.module.css";

type FormValues = {
  username: string;
  password: string;
};

const AdminLoginPage: React.FC = () => {
  const { t } = useAdminTranslation();
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();
  const { message } = App.useApp();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_PRODUCTS} replace />;
  }

  const onFinish = async (values: FormValues) => {
    try {
      await login(values.username.trim(), values.password);
      void message.success(t("admin.login.success"));
      navigate(ROUTES.ADMIN_PRODUCTS, { replace: true });
    } catch {
      void message.error(t("admin.login.failed"));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={LOGO_IMAGE} alt="" />
        </Link>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className={styles.form}
        >
          <Form.Item
            name="username"
            label={t("admin.login.username")}
            rules={[{ required: true, message: t("admin.login.usernameRequired") }]}
          >
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("admin.login.password")}
            rules={[{ required: true, message: t("admin.login.passwordRequired") }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("admin.login.submit")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
