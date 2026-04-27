import { Col, Flex, Row, Typography } from "antd";
import type { AboutMakersProps } from "./types";
import { getInitialsFromName } from "./utils";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const AboutMakers: React.FC<AboutMakersProps> = ({
  title,
  intro,
  makers,
  sectionId = "makers",
}) => {
  return (
    <section id={sectionId} className={styles.makers}>
      <div className={styles.makersInner}>
        <Flex vertical align="center" gap={8} className={styles.makersHeader}>
          <Title level={2} className={styles.makersTitle}>
            {title}
          </Title>
          {intro ? (
            <Paragraph className={styles.makersIntro}>{intro}</Paragraph>
          ) : null}
        </Flex>

        <Row gutter={[0, 24]} className={styles.makersRow}>
          {makers.map((maker, index) => {
            const isAlignedEnd = index % 2 === 1;
            return (
              <Col key={maker.id ?? `maker-${index}`} xs={24}>
                <div
                  className={`${styles.makerBlock} ${
                    isAlignedEnd ? styles.makerBlockEnd : styles.makerBlockStart
                  }`}
                >
                  <article className={styles.makerCard}>
                    <div className={styles.makerVisual}>
                      {maker.imageUrl ? (
                        <div className={styles.makerImageFrame}>
                          <img
                            src={maker.imageUrl}
                            alt={maker.imageAlt ?? maker.name}
                            className={styles.makerImage}
                          />
                        </div>
                      ) : (
                        <div className={styles.makerInitials} aria-hidden>
                          <span className={styles.makerInitialsText}>
                            {getInitialsFromName(maker.name)}
                          </span>
                        </div>
                      )}
                    </div>
                    <Flex vertical gap={4} className={styles.makerContent}>
                      <Title level={3} className={styles.makerName}>
                        {maker.name}
                      </Title>
                      {maker.role ? (
                        <Text className={styles.makerRole}>{maker.role}</Text>
                      ) : null}
                      <Paragraph className={styles.makerBio}>
                        {maker.description}
                      </Paragraph>
                    </Flex>
                  </article>
                </div>
            </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default AboutMakers;
