import { Button, Col, Divider, Form, Input, Row, Typography, Flex } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ContentCard from "src/components/ContentCard";
import CardGrid from "src/components/CardGrid";
import type { ContactFormValues } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ContactFormValues>();

  const handleSubmit = (_values: ContactFormValues) => {
    // TODO: integrate with API
  };

  const contactCards = [
    {
      icon: <MailOutlined />,
      title: t("contact.emailInfo"),
      detail: t("contact.emailAddress"),
    },
    {
      icon: <PhoneOutlined />,
      title: t("contact.phoneInfo"),
      detail: t("contact.phoneNumber"),
    },
    {
      icon: <EnvironmentOutlined />,
      title: t("contact.addressInfo"),
      detail: t("contact.address"),
    },
    {
      icon: <ClockCircleOutlined />,
      title: t("contact.hoursInfo"),
      detail: t("contact.hours"),
    },
  ];

  return (
    <>
      <Flex vertical align="center" className={styles.hero}>
        <Title level={1} className={styles.heroTitle}>
          {t("contact.title")}
        </Title>
        <Paragraph className={styles.heroSubtitle}>
          {t("contact.heroSubtitle")}
        </Paragraph>
      </Flex>

      <div className={styles.content}>
        <Row gutter={[48, 48]}>
          <Col xs={24} md={10}>
            <Title level={3} className={styles.sectionTitle}>
              {t("contact.infoTitle")}
            </Title>
            <Divider className={styles.divider} />
            <CardGrid preset="content2" gutter={[16, 16]}>
              {contactCards.map((card) => (
                <ContentCard
                  key={card.title}
                  variant="horizontal"
                  icon={card.icon}
                  title={card.title}
                  detail={card.detail}
                />
              ))}
            </CardGrid>
          </Col>

          <Col xs={24} md={14}>
            <Title level={3} className={styles.sectionTitle}>
              {t("contact.sendFormTitle")}
            </Title>
            <Divider className={styles.divider} />
            <Paragraph type="secondary" className={styles.formSubtitle}>
              {t("contact.subtitle")}
            </Paragraph>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                name="name"
                label={t("contact.nameLabel")}
                rules={[
                  { required: true, message: t("contact.nameRequired") },
                ]}
              >
                <Input placeholder={t("contact.namePlaceholder")} />
              </Form.Item>

              <Form.Item
                name="email"
                label={t("contact.emailLabel")}
                rules={[
                  { required: true, message: t("contact.emailRequired") },
                  { type: "email", message: t("contact.emailInvalid") },
                ]}
              >
                <Input placeholder={t("contact.emailPlaceholder")} />
              </Form.Item>

              <Form.Item
                name="message"
                label={t("contact.messageLabel")}
                rules={[
                  { required: true, message: t("contact.messageRequired") },
                ]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder={t("contact.messagePlaceholder")}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t("contact.send")}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ContactPage;
