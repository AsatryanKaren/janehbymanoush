import { CreditCardOutlined, ShopOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { PaymentTiming } from "../../types";
import type { PaymentTimingCardsProps } from "./types";
import styles from "./styles.module.css";

const OPTIONS: {
  value: PaymentTiming;
  titleKey: string;
  hintKey: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "online",
    titleKey: "checkout.paymentOnline",
    hintKey: "checkout.paymentOnlineHint",
    icon: <CreditCardOutlined />,
  },
  {
    value: "on_pickup",
    titleKey: "checkout.paymentOnPickup",
    hintKey: "checkout.paymentOnPickupHint",
    icon: <ShopOutlined />,
  },
];

const PaymentTimingCards: React.FC<PaymentTimingCardsProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.root} role="group" aria-label={t("checkout.paymentMethod")}>
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={[styles.card, selected ? styles.cardSelected : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              onChange?.(opt.value);
            }}
            aria-pressed={selected}
          >
            <span className={styles.iconWrap} aria-hidden>
              {opt.icon}
            </span>
            <Flex vertical gap={4} className={styles.textCol}>
              <Typography.Text className={styles.title}>
                {t(opt.titleKey)}
              </Typography.Text>
              <Typography.Text className={styles.hint}>
                {t(opt.hintKey)}
              </Typography.Text>
            </Flex>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentTimingCards;
