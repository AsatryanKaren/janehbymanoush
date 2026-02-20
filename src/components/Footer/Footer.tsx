import { Layout, Row, Col, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import {
  GlobalOutlined,
  MailOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { LOGO_IMAGE } from "@/consts/assets";
import {
  FOOTER_PURCHASES_LINKS,
  FOOTER_ABOUT_LINKS,
  FOOTER_ADDRESSES,
} from "./footer.config";
import styles from "./Footer.module.css";

const { Text } = Typography;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.main}>
        <Row gutter={[32, 48]}>
          <Col xs={24} md={12} lg={6}>
            <Text className={styles.brandTagline}>{t("footer.brandTagline")}</Text>
            <Space size="middle" className={styles.icons}>
              <a href="#" className={styles.iconLink} aria-label="Website">
                <GlobalOutlined />
              </a>
              <a href="mailto:hello@janehbymanoush.com" className={styles.iconLink} aria-label="Email">
                <MailOutlined />
              </a>
              <a href="#" className={styles.iconLink} aria-label="Share">
                <ShareAltOutlined />
              </a>
            </Space>
            <div className={styles.logoWrap}>
              <img src={LOGO_IMAGE} alt="JANEH" className={styles.logo} />
              <span className={styles.logoLine} />
              <Text className={styles.logoBy}>BY MANOUSH</Text>
            </div>
          </Col>
          <Col xs={24} md={6} lg={6}>
            <Text className={styles.columnTitle}>{t("footer.purchases.title")}</Text>
            <ul className={styles.linkList}>
              {FOOTER_PURCHASES_LINKS.map((item) => (
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
                  <span>{t(item.i18nKey)}</span>
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
          <Link to="/privacy" className={styles.legalLink}>
            {t("footer.privacy")}
          </Link>
          <Link to="/terms" className={styles.legalLink}>
            {t("footer.terms")}
          </Link>
        </Space>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
