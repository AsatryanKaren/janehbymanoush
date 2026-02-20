import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/consts/routes";
import styles from "./HeritageSection.module.css";

const { Title, Text } = Typography;

const HERITAGE_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";

const HeritageSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <Row gutter={[48, 48]} align="middle">
        <Col xs={24} lg={12} order={2} order-lg={1}>
          <div className={styles.imageWrap}>
            <img src={HERITAGE_IMAGE} alt="" className={styles.image} />
          </div>
        </Col>
        <Col xs={24} lg={12} order={1} order-lg={2}>
          <Text className={styles.label}>{t("home.heritage.label")}</Text>
          <Title level={2} className={styles.heading}>
            {t("home.heritage.heading")}
          </Title>
          <Text className={styles.body}>{t("home.heritage.body")}</Text>
          <Row gutter={[24, 24]} className={styles.features}>
            <Col xs={24} md={12}>
              <Title level={5} className={styles.featureTitle}>
                {t("home.heritage.ethicalTitle")}
              </Title>
              <Text type="secondary" className={styles.featureDesc}>
                {t("home.heritage.ethicalDesc")}
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Title level={5} className={styles.featureTitle}>
                {t("home.heritage.madeToOrderTitle")}
              </Title>
              <Text type="secondary" className={styles.featureDesc}>
                {t("home.heritage.madeToOrderDesc")}
              </Text>
            </Col>
          </Row>
          <Link to={ROUTES.ABOUT} className={styles.storyLink}>
            {t("home.heritage.ourFullStory")}
            <RightOutlined className={styles.storyIcon} />
          </Link>
        </Col>
      </Row>
    </section>
  );
};

export default HeritageSection;
