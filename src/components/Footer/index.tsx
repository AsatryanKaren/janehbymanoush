import { Layout, Row, Col, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import {
  GlobalOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TikTokOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { LOGO_IMAGE } from "src/consts/assets";
import {
  getPrivacyPolicyPdfHref,
  getTermsAndConditionsPdfHref,
} from "src/utils/legalDocuments";
import { SOCIAL_LINKS } from "src/consts/social";
import {
  FOOTER_HELP_LINKS,
  FOOTER_ABOUT_LINKS,
  FOOTER_ADDRESSES,
  toMapsUrl,
} from "./consts";
import styles from "./styles.module.css";

const { Text } = Typography;

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.paymentLogos} aria-label="Payment methods">
          <Space size={16} align="center" wrap className={styles.paymentLogosInner}>
            <img
              src="/images/payments/visa-logo.svg"
              alt="Visa"
              className={styles.paymentLogo}
              loading="lazy"
            />
            <img
              src="/images/payments/Mastercard-logo.svg"
              alt="Mastercard"
              className={styles.paymentLogo}
              loading="lazy"
            />
            <img
              src="/images/payments/mir.svg"
              alt="Mir"
              className={styles.paymentLogo}
              loading="lazy"
            />
            <img
              src="/images/payments/idram.svg"
              alt="Idram"
              className={styles.paymentLogo}
              loading="lazy"
            />
            <img
              src="/images/payments/arca.svg"
              alt="ArCa"
              className={styles.paymentLogo}
              loading="lazy"
            />
          </Space>
        </div>
        <Row gutter={[32, 48]}>
          <Col xs={24} md={12} lg={6}>
            <Text className={styles.brandTagline}>{t("footer.brandTagline")}</Text>
            <Space size="middle" className={styles.icons}>
              <a href="#" className={styles.iconLink} aria-label="Website">
                <GlobalOutlined />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=hello%40janehbymanoush.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Email"
              >
                <MailOutlined />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={t("common.socialInstagram")}
              >
                <InstagramOutlined />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={t("common.socialFacebook")}
              >
                <FacebookOutlined />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={t("common.socialTiktok")}
              >
                <TikTokOutlined />
              </a>
            </Space>
            <div className={styles.logoWrap}>
              <img src={LOGO_IMAGE} alt="JANEH" className={styles.logo} />
              <span className={styles.logoLine} />
              <Text className={styles.logoBy}>BY MANOUSH</Text>
            </div>
          </Col>
          <Col xs={24} md={6} lg={6}>
            <Text className={styles.columnTitle}>{t("footer.help.title")}</Text>
            <ul className={styles.linkList}>
              {FOOTER_HELP_LINKS.map((item) => (
                <li key={item.i18nKey}>
                  <Link to={item.path ?? "#"} className={styles.link}>
                    {t(item.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={24} md={6} lg={6}>
            <Text className={styles.columnTitle}>{t("footer.about.title")}</Text>
            <ul className={styles.linkList}>
              {FOOTER_ABOUT_LINKS.map((item) => (
                <li key={item.i18nKey}>
                  <Link to={item.path ?? "#"} className={styles.link}>
                    {t(item.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Text className={styles.columnTitle}>{t("footer.addresses.title")}</Text>
            <ul className={styles.addressList}>
              {FOOTER_ADDRESSES.map((item) => (
                <li key={item.i18nKey} className={styles.addressItem}>
                  <EnvironmentOutlined className={styles.addressIcon} />
                  <a
                    href={toMapsUrl(item.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.addressLink}
                  >
                    {t(item.i18nKey)}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
      <div className={styles.bottomBar}>
        <Text className={styles.copyright}>
          {t("footer.copyright", { year })}
        </Text>
        <Space size="middle" className={styles.legalLinks}>
          <a
            href={getPrivacyPolicyPdfHref(i18n.language)}
            className={styles.legalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.privacy")}
          </a>
          <a
            href={getTermsAndConditionsPdfHref(i18n.language)}
            className={styles.legalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.terms")}
          </a>
        </Space>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
