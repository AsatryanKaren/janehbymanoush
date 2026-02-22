import { Card, Flex, Typography } from "antd";
import type { ContentCardProps } from "./types";
import styles from "./styles.module.css";

const { Text, Paragraph } = Typography;

const ContentCard: React.FC<ContentCardProps> = (props) => {
  const { icon, title, variant, className } = props;
  const rootClass = [styles.card, styles[variant], className].filter(Boolean).join(" ");

  if (variant === "vertical") {
    return (
      <Card variant="borderless" className={rootClass}>
        <Flex vertical align="center" gap={16} className={styles.content}>
          <span className={styles.iconWrap}>{icon}</span>
          <Text strong className={styles.title}>
            {title}
          </Text>
          <Paragraph type="secondary" className={styles.description}>
            {props.description}
          </Paragraph>
        </Flex>
      </Card>
    );
  }

  return (
    <Card variant="borderless" className={rootClass}>
      <Flex align="center" gap={16} className={styles.content}>
        <span className={styles.iconWrap}>{icon}</span>
        <Flex vertical gap={4}>
          <Text strong>{title}</Text>
          <Text type="secondary">{props.detail}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ContentCard;
export type { ContentCardVariant, ContentCardProps } from "./types";
