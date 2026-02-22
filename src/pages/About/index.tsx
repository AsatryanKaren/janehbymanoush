import { Button, Divider, Typography, Flex } from "antd";
import {
  ExperimentOutlined,
  HeartOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContentCard from "src/components/ContentCard";
import CardGrid from "src/components/CardGrid";
import { ROUTES } from "src/consts/routes";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <CrownOutlined />,
      title: t("about.qualityTitle"),
      description: t("about.qualityDesc"),
    },
    {
      icon: <HeartOutlined />,
      title: t("about.sustainabilityTitle"),
      description: t("about.sustainabilityDesc"),
    },
    {
      icon: <ExperimentOutlined />,
      title: t("about.expressionTitle"),
      description: t("about.expressionDesc"),
    },
  ];

  return (
    <>
      <Flex vertical align="center" className={styles.hero}>
        <Title level={1} className={styles.heroTitle}>
          {t("about.title")}
        </Title>
        <Paragraph className={styles.heroSubtitle}>
          {t("about.heroSubtitle")}
        </Paragraph>
      </Flex>

      <div className={styles.storySection}>
        <Title level={2} className={styles.sectionTitle}>
          {t("about.ourStory")}
        </Title>
        <Divider className={styles.divider} />
        <Paragraph className={styles.storyText}>
          {t("about.paragraph1")}
        </Paragraph>
        <Paragraph className={styles.storyText}>
          {t("about.paragraph2")}
        </Paragraph>
        <Paragraph className={styles.storyText}>
          {t("about.paragraph3")}
        </Paragraph>
      </div>

      <div className={styles.valuesSection}>
        <Title level={2} className={styles.sectionTitle}>
          {t("about.valuesTitle")}
        </Title>
        <Divider className={styles.divider} />
        <CardGrid preset="content3" gutter={[24, 24]}>
          {values.map((value) => (
            <ContentCard
              key={value.title}
              variant="vertical"
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </CardGrid>
      </div>

      <Flex vertical align="center" className={styles.ctaSection}>
        <Title level={3} className={styles.ctaTitle}>
          {t("home.featuredPieces")}
        </Title>
        <Link to={ROUTES.WOMEN}>
          <Button type="primary" size="large">
            {t("about.shopNow")}
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default AboutPage;
