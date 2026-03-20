import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { AboutHeritageProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const AboutHeritage: React.FC<AboutHeritageProps> = ({ imageUrl }) => {
  const { t } = useTranslation();

  return (
    <section id="heritage" className={styles.heritage}>
      <div className={styles.heritageInner}>
        <div className={styles.heritageImageWrap}>
          <div className={styles.heritageImageFrame}>
            <img
              src={imageUrl}
              alt={t("about.heritageTitle")}
              className={styles.heritageImage}
            />
          </div>
        </div>
        <Flex vertical gap={20} className={styles.heritageContent}>
          <Title level={2} className={styles.heritageTitle}>
            {t("about.heritageTitle")}
          </Title>
          <Paragraph className={styles.heritageBody}>{t("about.heritageBody")}</Paragraph>
        </Flex>
      </div>
    </section>
  );
};

export default AboutHeritage;
