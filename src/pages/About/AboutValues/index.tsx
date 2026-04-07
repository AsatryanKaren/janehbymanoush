import { Typography, Row, Col, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { VALUES_KEYS, VALUE_ICONS, VALUES_IMAGE_MAP } from "./consts";
import type { ValueKey } from "./consts";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const AboutValues: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.values}>
      <div className={styles.valuesInner}>
        <Title level={2} className={styles.valuesTitle}>
          {t("about.valuesTitle")}
        </Title>
        <Row gutter={[24, 32]} className={styles.valuesRow}>
          {VALUES_KEYS.map((key: ValueKey) => {
            const Icon = VALUE_ICONS[key];
            const title = t(`about.${key}Title`);
            return (
              <Col xs={24} md={8} key={key}>
                <div className={styles.valueCard}>
                  <div className={styles.valueImageWrap}>
                    <img
                      src={VALUES_IMAGE_MAP[key]}
                      alt=""
                      className={styles.valueImage}
                    />
                    <div className={styles.valueImageIconWrap} aria-hidden>
                      <Icon className={styles.valueIcon} />
                    </div>
                  </div>
                  <Flex vertical gap={12} className={styles.valueCardFooter}>
                    <Title level={5} className={styles.valueCardTitle}>
                      {title}
                    </Title>
                    <Paragraph className={styles.valueCardBody}>
                      {t(`about.${key}Desc`)}
                    </Paragraph>
                  </Flex>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default AboutValues;
