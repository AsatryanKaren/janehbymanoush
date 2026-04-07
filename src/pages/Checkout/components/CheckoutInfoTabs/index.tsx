import { Tabs, Typography } from "antd";
import {
  FilePdfOutlined,
  FileTextOutlined,
  RightOutlined,
  SwapOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { getPrivacyPolicyPdfHref } from "src/utils/legalDocuments";
import styles from "../../styles.module.css";

/** Full shipping copy from `shipping.bullet*` (same as shipping info page). */
const SHIPPING_CHECKOUT_BULLETS = [1, 2, 3, 4, 5, 6] as const;

/** Full returns copy from `returns.bullet*` (same as returns info page). */
const RETURNS_CHECKOUT_BULLETS = [1, 2, 3, 4] as const;

const CheckoutInfoTabs: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.featuresBlock}>
      <Tabs
        className={styles.featuresTabs}
        defaultActiveKey="privacy"
        items={[
          {
            key: "privacy",
            label: (
              <span className={styles.featureTabLabel}>
                <FileTextOutlined className={styles.featureIcon} />
                {t("checkout.featurePrivacyPolicy")}
              </span>
            ),
            children: (
              <div className={styles.shippingInfo}>
                <Typography.Paragraph className={styles.shippingText}>
                  {t("checkout.privacyPolicySummary")}
                </Typography.Paragraph>
                <a
                  href={getPrivacyPolicyPdfHref(i18n.language)}
                  className={styles.checkoutFullPolicyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("checkout.privacyPdfLinkAria")}
                >
                  <FilePdfOutlined
                    className={styles.checkoutFullPolicyLinkPdfIcon}
                    aria-hidden
                  />
                  <span>{t("checkout.privacyPdfLink")}</span>
                  <RightOutlined className={styles.checkoutFullPolicyLinkIcon} />
                </a>
              </div>
            ),
          },
          {
            key: "shipping",
            label: (
              <span className={styles.featureTabLabel}>
                <TruckOutlined className={styles.featureIcon} />
                {t("checkout.featureShipping")}
              </span>
            ),
            children: (
              <div className={styles.shippingInfo}>
                {SHIPPING_CHECKOUT_BULLETS.map((n) => (
                  <Typography.Paragraph
                    key={n}
                    className={styles.shippingText}
                  >
                    {t(`shipping.bullet${n}`)}
                  </Typography.Paragraph>
                ))}
                <Link
                  to={ROUTES.SHIPPING}
                  className={styles.checkoutFullPolicyLink}
                >
                  <span>{t("shipping.title")}</span>
                  <RightOutlined className={styles.checkoutFullPolicyLinkIcon} />
                </Link>
              </div>
            ),
          },
          {
            key: "returns",
            label: (
              <span className={styles.featureTabLabel}>
                <SwapOutlined className={styles.featureIcon} />
                {t("checkout.featureReturns")}
              </span>
            ),
            children: (
              <div className={styles.shippingInfo}>
                {RETURNS_CHECKOUT_BULLETS.map((n) => (
                  <Typography.Paragraph
                    key={n}
                    className={styles.shippingText}
                  >
                    {t(`returns.bullet${n}`)}
                  </Typography.Paragraph>
                ))}
                <Link
                  to={ROUTES.RETURNS}
                  className={styles.checkoutFullPolicyLink}
                >
                  <span>{t("returns.title")}</span>
                  <RightOutlined className={styles.checkoutFullPolicyLinkIcon} />
                </Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CheckoutInfoTabs;
