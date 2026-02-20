import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/consts/routes";
import styles from "./CuratedEdits.module.css";

const { Title, Text } = Typography;

const COLLECTIONS = [
  { key: "collection1", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" },
  { key: "collection2", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
  { key: "collection3", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" },
] as const;

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
        {COLLECTIONS.map((item, index) => (
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
