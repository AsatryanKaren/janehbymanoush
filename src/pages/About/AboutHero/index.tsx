import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { AboutHeroProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const AboutHero: React.FC<AboutHeroProps> = ({ imageUrl }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={styles.heroOverlay}>
        <Text className={styles.heroBrand}>{t("about.heroBrand")}</Text>
        <Title level={1} className={styles.heroName1}>
          {t("about.heroName1")}
        </Title>
        <Title level={1} className={styles.heroName2}>
          {t("about.heroName2")}
        </Title>
        <Paragraph className={styles.heroTagline}>
          {t("about.heroTagline")}
        </Paragraph>
        <a href="#heritage" className={styles.heroLearnMore}>
          {t("about.heroLearnMore")}
        </a>
      </div>
    </section>
  );
};

export default AboutHero;
