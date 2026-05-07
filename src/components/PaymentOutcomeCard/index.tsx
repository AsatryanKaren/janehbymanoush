import { Button, Typography } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import type { PaymentOutcomeCardProps } from "./types";
import styles from "./styles.module.css";

const { Text, Paragraph } = Typography;

const PaymentOutcomeCard: React.FC<PaymentOutcomeCardProps> = ({ variant }) => {
  const { t } = useTranslation();
  const isSuccess = variant === "success";
  const prefix = isSuccess ? "paymentResult.success" : "paymentResult.failed";

  return (
    <article className={styles.card}>
      <div className={styles.top} data-variant={variant}>
        <div className={styles.iconWrap} aria-hidden>
          {isSuccess ? (
            <CheckCircleFilled className={styles.iconSuccess} />
          ) : (
            <CloseCircleFilled className={styles.iconFailed} />
          )}
        </div>
        <Text className={styles.label}>{t("paymentResult.label")}</Text>
        <Typography.Title level={1} className={styles.headline}>
          {t(`${prefix}.headline`)}
        </Typography.Title>
        <Paragraph className={styles.description}>{t(`${prefix}.description`)}</Paragraph>
      </div>
      <div className={styles.bottom}>
        <Link
          to={isSuccess ? ROUTES.HOME : ROUTES.CHECKOUT}
          className={styles.btnLink}
        >
          <Button type="primary" size="large" className={styles.primaryBtn} block>
            {t(`${prefix}.primaryCta`)}
          </Button>
        </Link>
        <Link to={ROUTES.CATALOG} className={styles.btnLink}>
          <Button size="large" className={styles.secondaryBtn} block>
            {t(`${prefix}.secondaryCta`)}
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default PaymentOutcomeCard;
