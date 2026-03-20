import { Flex, Typography } from "antd";
import type { ContentWithImageProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const ContentWithImage: React.FC<ContentWithImageProps> = ({
  title,
  paragraphs,
  bullets,
  tipsHeading,
  signOff,
  referenceLink,
  imageUrl,
  imageAlt = "",
}) => {
  const hasBullets = Boolean(bullets && bullets.length > 0);

  const bodyAfterTips = hasBullets ? (
    <div className={styles.closingBlock}>
      {paragraphs.map((text, i) => (
        <Paragraph key={i} className={styles.closingBlockText}>
          {text}
        </Paragraph>
      ))}
      {signOff ? <Text className={styles.signOff}>{signOff}</Text> : null}
    </div>
  ) : (
    <>
      {paragraphs.map((text, i) => (
        <Paragraph key={i} className={styles.paragraph}>
          {text}
        </Paragraph>
      ))}
      {signOff ? <Text className={styles.signOff}>{signOff}</Text> : null}
    </>
  );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageSticky}>
          <div className={styles.imageFrame}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.content}>
          <Title level={2} className={hasBullets ? styles.titleCare : styles.title}>
            {title}
          </Title>
          {hasBullets ? (
            <div className={styles.tipsPanel}>
              {tipsHeading ? (
                <Text className={styles.tipsLabel}>{tipsHeading}</Text>
              ) : null}
              <Flex vertical gap={18} className={styles.tipsList}>
                {bullets!.map((text, i) => (
                  <Flex key={i} gap={16} align="start" className={styles.tipRow}>
                    <span className={styles.tipIndex} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Paragraph className={styles.tipText}>{text}</Paragraph>
                  </Flex>
                ))}
              </Flex>
              {referenceLink ? (
                <div className={styles.referenceLink}>
                  <Typography.Link
                    href={referenceLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.referenceLinkAnchor}
                  >
                    {referenceLink.label}
                  </Typography.Link>
                </div>
              ) : null}
            </div>
          ) : null}
          {hasBullets ? (
            <div className={styles.fadeRule} aria-hidden />
          ) : null}
          {bodyAfterTips}
        </div>
      </div>
    </section>
  );
};

export default ContentWithImage;
export type { ContentWithImageProps };
