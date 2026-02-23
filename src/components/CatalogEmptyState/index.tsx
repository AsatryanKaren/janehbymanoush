import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import styles from "./styles.module.css";

const CatalogEmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrap}>
      <div className={styles.motif} aria-hidden>
        <span className={`${styles.ring} ${styles.ringOuter}`} />
        <span className={`${styles.ring} ${styles.ringMid}`} />
        <span className={`${styles.ring} ${styles.ringInner}`} />
        <span className={styles.dot} />
      </div>
      <h2 className={styles.title}>{t("catalog.emptyTitle")}</h2>
      <p className={styles.description}>{t("catalog.emptyDescription")}</p>
      <Link to={ROUTES.CATALOG} className={styles.action}>
        {t("catalog.emptyAction")}
      </Link>
    </div>
  );
};

export default CatalogEmptyState;
