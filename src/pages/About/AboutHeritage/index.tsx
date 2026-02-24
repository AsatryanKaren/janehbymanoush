import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import type { AboutHeritageProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const AboutHeritage: React.FC<AboutHeritageProps> = ({ imageUrl }) => {
  const { t } = useTranslation();

  return (
    <section id="heritage" className={styles.heritage}>
      <div className={styles.heritageInner}>
        <div className={styles.heritageImageWrap}>
          <img
            src={imageUrl}
            alt=""
            className={styles.heritageImage}
          />
        </div>
        <div className={styles.heritageContent}>
          <Title level={2} className={styles.heritageTitle}>
            {t("about.heritageTitle")}
          </Title>
          <Text className={styles.heritageSubtitle}>
            {t("about.heritageSubtitle")}
          </Text>
          <Paragraph className={styles.heritageBody}>
            {t("about.heritageBody")}
          </Paragraph>
          <Link to={ROUTES.CATALOG} className={styles.heritageReadMore}>
            {t("about.heritageReadMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHeritage;
