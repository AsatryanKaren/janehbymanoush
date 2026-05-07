import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Typography } from "antd";
import {
  ClockCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "src/app/providers/CartProvider";
import { ROUTES } from "src/consts/routes";
import type { OutcomeBlockProps } from "./types";
import { clearPending, getPending } from "./sessionStore";
import { usePaymentStatusPolling } from "./usePaymentStatusPolling";
import styles from "./styles.module.css";

const { Text, Paragraph } = Typography;

const OutcomeBlock: React.FC<OutcomeBlockProps> = ({
  variant,
  icon,
  title,
  subtitle,
  actions,
}) => (
  <Flex vertical align="center" className={styles.outcome}>
    <div className={styles.iconStage} data-variant={variant}>
      <span className={styles.iconSymbol}>{icon}</span>
    </div>
    <Typography.Title level={3} className={styles.outcomeTitle}>
      {title}
    </Typography.Title>
    <Paragraph className={styles.outcomeSubtitle}>{subtitle}</Paragraph>
    <div className={styles.actions}>
      <div className={styles.actionsInner}>{actions}</div>
    </div>
  </Flex>
);

const PaymentStatusPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, removeItem } = useCart();

  // Read sessionStorage exactly once on mount; subsequent renders should
  // not re-trigger polling for the same payment.
  const [epgOrderId] = useState<string | null>(() => getPending()?.epgOrderId ?? null);

  const { phase, retry } = usePaymentStatusPolling(epgOrderId);

  // Terminal-state handoff to the dedicated outcome routes.
  useEffect(() => {
    if (phase === "success") {
      items.forEach((item) => removeItem(item.id));
      clearPending();
      navigate(ROUTES.PAYMENT_SUCCESS, { replace: true });
      return;
    }
    if (phase === "failed") {
      clearPending();
      navigate(ROUTES.PAYMENT_FAILED, { replace: true });
    }
  }, [phase, navigate, items, removeItem]);

  const headlineKey = useMemo(() => {
    if (phase === "pendingTimeout") return "paymentStatus.pendingHeadline";
    if (phase === "noPayment") return "paymentStatus.noPaymentHeadline";
    return "paymentStatus.loadingHeadline";
  }, [phase]);

  return (
    <div className={styles.page}>
      <div className={styles.spine} aria-hidden />
      <div className={styles.frame}>
        <div className={styles.card}>
          <div className={styles.cardInnerGlow} aria-hidden />
          <header className={styles.header}>
            <div className={styles.kickerRow}>
              <span className={styles.kickerLine} aria-hidden />
              <Text className={styles.title}>{t("paymentStatus.sectionLabel")}</Text>
              <span className={styles.kickerLine} aria-hidden />
            </div>
            <Typography.Title level={2} className={styles.headline}>
              {t(headlineKey)}
            </Typography.Title>
          </header>
          <div className={styles.divider} aria-hidden />
          <div className={styles.body}>
            {(phase === "idle" || phase === "polling") ? (
              <div
                className={styles.loading}
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <div className={styles.loadingVisual} aria-hidden>
                  <svg
                    className={styles.loadingSvg}
                    viewBox="0 0 88 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="paymentStatusLoaderStroke"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#7a5343" />
                        <stop offset="45%" stopColor="#c29a73" />
                        <stop offset="100%" stopColor="#e8d4be" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(44 44)">
                      <circle
                        className={styles.loadingTrackCircle}
                        cx="0"
                        cy="0"
                        r="32"
                        strokeWidth="1.25"
                      />
                      <g className={styles.loadingArcGroup}>
                        <circle
                          className={styles.loadingArcCircle}
                          cx="0"
                          cy="0"
                          r="32"
                          stroke="url(#paymentStatusLoaderStroke)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="56 146"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <Text className={styles.loadingHint}>
                  {t("paymentStatus.loadingHint")}
                </Text>
              </div>
            ) : null}

            {phase === "pendingTimeout" ? (
              <OutcomeBlock
                variant="pending"
                icon={
                  <ClockCircleOutlined
                    className={styles.iconSymbolPending}
                    aria-hidden
                  />
                }
                title={t("paymentStatus.pendingTitle")}
                subtitle={t("paymentStatus.pendingSubtitle")}
                actions={
                  <>
                    <span className={styles.primaryBtn}>
                      <Button type="primary" size="large" onClick={retry}>
                        {t("paymentStatus.checkAgain")}
                      </Button>
                    </span>
                    <Link to={ROUTES.CONTACT} className={styles.ghostBtn}>
                      <Button size="large">
                        {t("paymentStatus.contactSupport")}
                      </Button>
                    </Link>
                  </>
                }
              />
            ) : null}

            {phase === "noPayment" ? (
              <OutcomeBlock
                variant="noPayment"
                icon={
                  <InfoCircleOutlined
                    className={styles.iconSymbolNoPayment}
                    aria-hidden
                  />
                }
                title={t("paymentStatus.noPaymentTitle")}
                subtitle={t("paymentStatus.noPaymentSubtitle")}
                actions={
                  <>
                    <Link to={ROUTES.CHECKOUT} className={styles.primaryBtn}>
                      <Button type="primary" size="large">
                        {t("paymentStatus.goToCheckout")}
                      </Button>
                    </Link>
                    <Link to={ROUTES.CATALOG} className={styles.ghostBtn}>
                      <Button size="large">
                        {t("paymentStatus.continueShopping")}
                      </Button>
                    </Link>
                  </>
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
