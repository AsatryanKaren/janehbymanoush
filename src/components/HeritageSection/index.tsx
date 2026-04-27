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
      <Row
        gutter={[
          { xs: 12, sm: 16, md: 20, lg: 72 },
          { xs: 0, sm: 0, md: 0, lg: 48 },
        ]}
        className={styles.mainRow}
        align="stretch"
      >
        <Col xs={{ span: 9 }} lg={{ span: 12 }} className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <img
              src={HERITAGE_IMAGE}
              alt=""
              className={styles.image}
              loading="lazy"
            />
          </div>
        </Col>
        <Col xs={{ span: 15 }} lg={{ span: 12 }} className={styles.textCol}>
          <div className={styles.contentWrap}>
            <Title level={2} className={styles.heading}>
              {t("home.heritage.heading")}
            </Title>
            <Text className={styles.body}>{t("home.heritage.body")}</Text>
            <Link to={ROUTES.ABOUT} className={styles.storyLinkMobile}>
              {t("home.heritage.ourStory")}
              <RightOutlined className={styles.storyIcon} />
            </Link>
            <div className={styles.desktopBlock}>
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
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HeritageSection;
