import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { VALUES_KEYS, VALUE_ICONS } from "./consts";
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
            return (
              <Col xs={24} md={8} key={key}>
                <div className={styles.valueCard}>
                  <div className={styles.valueIconWrap}>
                    <Icon className={styles.valueIcon} />
                  </div>
                  <div className={styles.valueCardText}>
                    <Title level={5} className={styles.valueCardTitle}>
                      {t(`about.${key}Title`)}
                    </Title>
                    <Paragraph className={styles.valueCardBody}>
                      {t(`about.${key}Desc`)}
                    </Paragraph>
                  </div>
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
