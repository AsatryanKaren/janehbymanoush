import { Button, Col, Form, Input, Row, Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { toMapsUrl } from "src/components/Footer/consts";
import { SOCIAL_LINKS } from "src/consts/social";
import {
  CONTACT_IMAGES,
  CONTACT_PHONE_TEL,
  GOOGLE_MAP_EMBED_URL,
  GMAIL_COMPOSE_URL,
} from "./consts";
import type { ContactFormValues } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ContactFormValues>();

  const handleSubmit = (_values: ContactFormValues) => {
    // TODO: integrate with API
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <div className={styles.accentLine} />
            <Title level={2} className={styles.inquiriesTitle}>
              {t("contact.inquiriesTitle")}
            </Title>
            <Paragraph className={styles.inquiriesDesc}>
              {t("contact.inquiriesDesc")}
            </Paragraph>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
              size="large"
              className={styles.form}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label={t("contact.nameLabel")}
                    rules={[
                      { required: true, message: t("contact.nameRequired") },
                    ]}
                  >
                    <Input placeholder={t("contact.namePlaceholder")} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                </Col>
              </Row>

              <Form.Item
                name="subject"
                label={t("contact.subjectLabel")}
              >
                <Input placeholder={t("contact.subjectPlaceholder")} />
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
                <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                  {t("contact.send")}
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.studioWrap}>
              <img
                src={CONTACT_IMAGES.studio}
                alt=""
                className={styles.studioImage}
              />
              <div className={styles.studioOverlay}>
                <Text className={styles.studioOverlayTitle}>
                  {t("contact.ourStudio")}
                </Text>
                <Text className={styles.studioOverlayTagline}>
                  {t("contact.studioTagline")}
                </Text>
              </div>
            </div>
          </Col>
        </Row>

        <div className={styles.contactMapBlock}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className={styles.contactBlocks}>
                <div className={styles.contactBlock}>
                  <MailOutlined className={styles.contactIcon} />
                  <div>
                    <Text className={styles.contactLabel}>
                      {t("contact.emailInfo")}
                    </Text>
                    <a
                      href={GMAIL_COMPOSE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactValueLink}
                    >
                      {t("contact.emailAddress")}
                    </a>
                  </div>
                </div>
                <div className={styles.contactBlock}>
                  <PhoneOutlined className={styles.contactIcon} />
                  <div>
                    <Text className={styles.contactLabel}>
                      {t("contact.phoneInfo")}
                    </Text>
                    <a
                      href={`tel:${CONTACT_PHONE_TEL}`}
                      className={styles.contactValueLink}
                    >
                      {t("contact.phoneNumber")}
                    </a>
                  </div>
                </div>
                <div className={styles.contactBlock}>
                  <EnvironmentOutlined className={styles.contactIcon} />
                  <div>
                    <Text className={styles.contactLabel}>
                      {t("contact.studioAddressLabel")}
                    </Text>
                    <a
                      href={toMapsUrl(
                        "Rio Mall, Papazyan 8, 2nd floor, Yerevan, Armenia"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactAddressLink}
                    >
                      {t("contact.studioAddressValue")}
                    </a>
                  </div>
                </div>
                <div className={styles.socialRow}>
                  <Text className={styles.socialLabel}>
                    {t("contact.followUs")}
                  </Text>
                  <div className={styles.socialLinks}>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={t("common.socialInstagram")}
                    >
                      <InstagramOutlined />
                    </a>
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={t("common.socialFacebook")}
                    >
                      <FacebookOutlined />
                    </a>
                    <a
                      href={SOCIAL_LINKS.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={t("common.socialTiktok")}
                    >
                      <TikTokOutlined />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.mapWrap}>
                <iframe
                  title={t("contact.studioAddressLabel")}
                  src={GOOGLE_MAP_EMBED_URL}
                  width="100%"
                  height="240"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.mapIframe}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
