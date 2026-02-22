import { Typography, Input, Button, Form } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const NewsletterSection: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = () => {
    form.resetFields();
  };

  return (
    <section className={styles.section}>
      <MailOutlined className={styles.icon} />
      <Title level={3} className={styles.title}>
        {t("home.newsletter.title")}
      </Title>
      <Text type="secondary" className={styles.subtitle}>
        {t("home.newsletter.subtitle")}
      </Text>
      <Form
        form={form}
        onFinish={onFinish}
        layout="inline"
        className={styles.form}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "" }]}
          className={styles.formItem}
        >
          <Input
            placeholder={t("home.newsletter.placeholder")}
            size="large"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item className={styles.formItem}>
          <Button type="primary" htmlType="submit" size="large" className={styles.button}>
            {t("home.newsletter.button")}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default NewsletterSection;
