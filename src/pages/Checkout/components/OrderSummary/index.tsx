import { useTranslation } from "react-i18next";
import RingSizeSelector from "src/components/RingSizeSelector";
import type { CartItem } from "src/types/cart";
import { formatPrice } from "src/utils/formatPrice";
import { isRingItem } from "src/utils/isRingItem";
import { getProductName } from "src/utils/productLocale";
import { Space } from "antd";
import styles from "../../styles.module.css";

const DEFAULT_CURRENCY = "AMD";

type OrderSummaryProps = {
  items: CartItem[];
  totalAmount: number;
  onUpdateRingSize: (itemId: string, value: number | null, isCustom: boolean) => void;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalAmount,
  onUpdateRingSize,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className={styles.summaryCard}>
      <ul className={styles.summaryList}>
        {items.map((item) => {
          const name = getProductName(item, lang);
          const imgUrl = item.mainImageUrl ?? undefined;
          const isRing = isRingItem(item);

          return (
            <li key={item.id} className={styles.summaryItem}>
              {imgUrl ? (
                <img
                  src={encodeURI(imgUrl)}
                  alt={name}
                  className={styles.summaryItemImage}
                />
              ) : (
                <div className={styles.summaryItemImage} />
              )}
              <div className={styles.summaryItemBody}>
                <div className={styles.summaryItemName}>{name}</div>
                <div className={styles.summaryItemMeta}>
                  {item.quantity} ×{" "}
                  {formatPrice(item.price ?? 0, DEFAULT_CURRENCY, lang)}
                </div>
                {isRing && (
                  <div className={styles.summaryRingSize}>
                    <RingSizeSelector
                      value={item.ringSize ?? null}
                      isCustom={item.ringSizeIsCustom ?? false}
                      onChange={(value, isCustom) =>
                        onUpdateRingSize(item.id, value, isCustom)
                      }
                      error={
                        item.ringSize == null || typeof item.ringSize !== "number"
                      }
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.summaryTotal}>
        <span>{t("cart.total")}</span>
        <span>{formatPrice(totalAmount, DEFAULT_CURRENCY, lang)}</span>
      </div>

      <div className={styles.summaryPaymentLogos} aria-label="Payment methods">
        <Space size={12} align="center" wrap className={styles.summaryPaymentLogosInner}>
          <img
            src="/images/payments/visa-logo.svg"
            alt="Visa"
            className={styles.summaryPaymentLogo}
            loading="lazy"
          />
          <img
            src="/images/payments/Mastercard-logo.svg"
            alt="Mastercard"
            className={styles.summaryPaymentLogo}
            loading="lazy"
          />
          <img
            src="/images/payments/mir.svg"
            alt="Mir"
            className={styles.summaryPaymentLogo}
            loading="lazy"
          />
          <img
            src="/images/payments/idram.svg"
            alt="Idram"
            className={styles.summaryPaymentLogo}
            loading="lazy"
          />
          <img
            src="/images/payments/arca.svg"
            alt="ArCa"
            className={styles.summaryPaymentLogo}
            loading="lazy"
          />
        </Space>
      </div>
    </div>
  );
};

export default OrderSummary;
