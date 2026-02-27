import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { CRAFT_COLUMNS, CRAFT_IMAGE_MAP } from "./consts";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const AboutCraft: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.craft}>
      <div className={styles.craftInner}>
        <Title level={2} className={styles.craftTitle}>
          {t("about.craftTitle")}
        </Title>
        <Text className={styles.craftSubtitle}>
          {t("about.craftSubtitle")}
        </Text>
        <Row gutter={[32, 40]} className={styles.craftRow}>
          {CRAFT_COLUMNS.map((key) => (
            <Col xs={24} md={8} key={key}>
              <div className={styles.craftColumn}>
                <div className={styles.craftImageWrap}>
                  <img
                    src={CRAFT_IMAGE_MAP[key]}
                    alt=""
                    className={styles.craftImage}
                  />
                </div>
                <Title level={5} className={styles.craftColumnTitle}>
                  {t(
                    `about.craft${key.charAt(0).toUpperCase()}${key.slice(1)}Title`,
                  )}
                </Title>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutCraft;
