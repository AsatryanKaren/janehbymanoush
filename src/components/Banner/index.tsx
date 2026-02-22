import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { HERO_IMAGE } from "./consts";
import styles from "./styles.module.css";

const Banner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className={styles.banner}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.25)), url(${HERO_IMAGE})`,
      }}
    >
      <div className={styles.content}>
        <p className={styles.tagline}>{t("home.tagline")}</p>
        <h1 className={styles.brand}>
          <span className={styles.brandLine1}>{t("home.brandLine1")}</span>
          <span className={styles.brandLine2}>{t("home.brandLine2")}</span>
        </h1>
        <Flex gap="middle" justify="center" className={styles.actions}>
          <Link to={ROUTES.CATALOG}>
            <Button type="primary" size="large" className={styles.btnPrimary}>
              {t("home.newCollection")}
            </Button>
          </Link>
          <Link to={ROUTES.CATALOG}>
            <Button size="large" className={styles.btnOutline}>
              {t("home.viewAll")}
            </Button>
          </Link>
        </Flex>
      </div>
    </section>
  );
};

export default Banner;
