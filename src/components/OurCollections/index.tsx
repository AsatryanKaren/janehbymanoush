import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { COLLECTION_CARDS } from "./consts";
import styles from "./styles.module.css";

const { Title } = Typography;

const OurCollections: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>
              {t("home.ourCollections.label")}
            </span>
            <Title level={2} className={styles.title}>
              {t("home.ourCollections.title")}
            </Title>
          </div>
          <Link to={ROUTES.CATALOG} className={styles.viewAll}>
            {t("home.ourCollections.viewAll")}
          </Link>
        </div>
        <div className={styles.cardsRow}>
          {COLLECTION_CARDS.map((item) => (
            <Link
              to={item.linkTo}
              className={styles.card}
              key={item.key}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className={styles.cardImage}
                />
              ) : (
                <div className={styles.cardPlaceholder} />
              )}
              <span className={styles.cardLabel}>
                {t(`home.ourCollections.${item.key}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCollections;
