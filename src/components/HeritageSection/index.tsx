import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { HERITAGE_IMAGE } from "./consts";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const HeritageSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <Row gutter={[72, 48]} align="middle">
        {/* Image left on desktop (lg), below content on mobile (xs) */}
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
          <div className={styles.imageWrap}>
            <img src={HERITAGE_IMAGE} alt="" className={styles.image} />
          </div>
        </Col>
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
          <div className={styles.contentWrap}>
            <Text className={styles.label}>{t("home.heritage.label")}</Text>
            <Title level={2} className={styles.heading}>
              {t("home.heritage.heading")}
            </Title>
            <Text className={styles.body}>{t("home.heritage.body")}</Text>
            <Row gutter={[24, 24]} className={styles.features}>
              <Col xs={24} md={12}>
                <Title level={5} className={styles.featureTitle}>
                  {t("home.heritage.rawMaterialsTitle")}
                </Title>
                <Text className={styles.featureDesc}>
                  {t("home.heritage.rawMaterialsDesc")}
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Title level={5} className={styles.featureTitle}>
                  {t("home.heritage.individualityTitle")}
                </Title>
                <Text className={styles.featureDesc}>
                  {t("home.heritage.individualityDesc")}
                </Text>
              </Col>
            </Row>
            <Link to={ROUTES.ABOUT} className={styles.storyLink}>
              {t("home.heritage.ourStory")}
              <RightOutlined className={styles.storyIcon} />
            </Link>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HeritageSection;
