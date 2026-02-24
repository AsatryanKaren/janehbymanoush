import { Typography } from "antd";
import type { ContentWithImageProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const ContentWithImage: React.FC<ContentWithImageProps> = ({
  title,
  paragraphs,
  imageUrl,
  imageAlt = "",
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <Title level={2} className={styles.title}>
            {title}
          </Title>
          {paragraphs.map((text, i) => (
            <Paragraph key={i} className={styles.paragraph}>
              {text}
            </Paragraph>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentWithImage;
export type { ContentWithImageProps };
