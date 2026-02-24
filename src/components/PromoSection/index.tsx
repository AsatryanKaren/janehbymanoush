import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { PROMO_IMAGE } from "./consts";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const PromoSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} lg={{ span: 12, order: 1 }}>
            <div className={styles.imageWrap}>
              <img
                src={PROMO_IMAGE}
                alt=""
                className={styles.image}
              />
            </div>
          </Col>
          <Col xs={24} lg={{ span: 12, order: 2 }}>
            <div className={styles.contentWrap}>
              <Text className={styles.label}>
                {t("home.promoSection.label")}
              </Text>
              <Title level={2} className={styles.heading}>
                {t("home.promoSection.heading")}
              </Title>
              <Text className={styles.body}>
                {t("home.promoSection.body")}
              </Text>
              <Link to={ROUTES.CATALOG} className={styles.ctaLink}>
                {t("home.promoSection.cta")}
                <RightOutlined className={styles.ctaIcon} />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PromoSection;
