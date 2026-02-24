import { Typography, Input, Button, Form, Space } from "antd";
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
      <div className={styles.inner}>
        <div className={styles.iconWrap}>
          <MailOutlined className={styles.icon} />
        </div>
        <span className={styles.label}>{t("home.newsletter.label")}</span>
        <Title level={3} className={styles.title}>
          {t("home.newsletter.title")}
        </Title>
        <Text className={styles.subtitle}>
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
            <Space.Compact className={styles.compact} block>
              <Input
                placeholder={t("home.newsletter.placeholder")}
                className={styles.input}
              />
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                {t("home.newsletter.button")}
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default NewsletterSection;
