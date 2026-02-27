import { useState, useEffect } from "react";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import heroImage from "./assets/newBanner.jpg";
import styles from "./styles.module.css";

const Banner: React.FC = () => {
  const { t } = useTranslation();
  const [heightPx, setHeightPx] = useState<number | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      const headerHeight = 72; /* matches layout header height */
      setHeightPx(window.innerHeight - headerHeight);
    }
  }, []);

  return (
    <section
      className={styles.banner}
      style={{
        ...(heightPx !== null && { height: heightPx }),
        backgroundImage: `linear-gradient(rgba(28,25,23,0.15), rgba(28,25,23,0.2)), url(${heroImage})`,
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
