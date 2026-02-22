import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { COLLECTIONS } from "./consts";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const CuratedEdits: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <Title level={2} className={styles.title}>
            {t("home.curatedEdits.title")}
          </Title>
          <Text type="secondary" className={styles.subtitle}>
            {t("home.curatedEdits.subtitle")}
          </Text>
        </div>
        <Link to={ROUTES.CATALOG} className={styles.browseAll}>
          {t("home.curatedEdits.browseAll")}
        </Link>
      </div>
      <Row gutter={[24, 32]}>
        {COLLECTIONS.map((item) => (
          <Col xs={24} md={8} key={item.key}>
            <Link to={ROUTES.CATALOG} className={styles.card}>
              <div
                className={styles.imageWrap}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <Title level={5} className={styles.cardTitle}>
                {t(`home.curatedEdits.${item.key}`)}
              </Title>
              <Text className={styles.explore}>{t("home.curatedEdits.explore")}</Text>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default CuratedEdits;
