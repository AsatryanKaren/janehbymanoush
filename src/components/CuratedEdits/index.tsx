import { Typography, Row, Col, Grid } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { COLLECTIONS } from "./consts";
import styles from "./styles.module.css";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const CuratedEdits: React.FC = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = Boolean(screens.xs && !screens.md);
  const items = isMobile ? COLLECTIONS.slice(0, 2) : COLLECTIONS;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <Title level={2} className={styles.title}>
            {t("home.curatedEdits.title")}
          </Title>
          <span className={styles.subtitle}>
            {t("home.curatedEdits.subtitle")}
          </span>
        </div>
        <Link to={ROUTES.CATALOG} className={styles.browseAll}>
          {t("home.curatedEdits.browseAll")}
        </Link>
      </div>
      <Row gutter={[24, 32]}>
        {items.map((item) => (
          <Col xs={12} md={8} key={item.key}>
            <Link to={ROUTES.CATALOG} className={styles.card}>
              <div
                className={styles.imageWrap}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <Title level={5} className={styles.cardTitle}>
                {t(`home.curatedEdits.${item.key}`)}
              </Title>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default CuratedEdits;
