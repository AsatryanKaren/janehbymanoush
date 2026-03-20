import { Tabs, Typography } from "antd";
import { FileTextOutlined, TruckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import styles from "../../styles.module.css";

const CheckoutInfoTabs: React.FC = () => {
  const { t } = useTranslation();

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
                <Link to={ROUTES.SHIPPING} className={styles.privacyLinkInline}>
                  {t("footer.privacy")}
                </Link>
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
                <Typography.Paragraph className={styles.shippingText}>
                  {t("shipping.intro")}
                </Typography.Paragraph>
                <Typography.Paragraph className={styles.shippingText}>
                  {t("shipping.options")}
                </Typography.Paragraph>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CheckoutInfoTabs;
