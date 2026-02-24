import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import type { AboutCtaProps } from "./types";
import styles from "./styles.module.css";

const { Title } = Typography;

const AboutCta: React.FC<AboutCtaProps> = ({ imageUrl }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.cta}>
      {imageUrl && (
        <div
          className={styles.ctaBg}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className={styles.ctaInner}>
        <Title level={2} className={styles.ctaHeading}>
          {t("about.ctaHeading")}
        </Title>
        <div className={styles.ctaButtons}>
          <Link to={ROUTES.CATALOG}>
            <Button
              type="primary"
              size="large"
              className={styles.ctaBtnPrimary}
            >
              {t("about.ctaViewCollections")}
            </Button>
          </Link>
          <Link to={ROUTES.CONTACT}>
            <Button size="large" className={styles.ctaBtnOutline}>
              {t("about.ctaDetails")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
