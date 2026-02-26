import { useState } from "react";
import { Button, Tag, Typography } from "antd";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatPrice } from "src/utils/formatPrice";
import OrderModal from "../OrderModal";
import type { OrderFormValues } from "../OrderModal/types";
import type { ProductInfoProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  name,
  description,
}) => {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const isAvailable = product.isActive !== false;

  const handleOrderSuccess = (_values: OrderFormValues) => {
    // TODO: integrate with API (e.g. submit order with product + quantity)
  };

  return (
    <div className={styles.wrapper}>
      {product.collectionName && (
        <div className={styles.collectionLabel}>
          «{product.collectionName}»
        </div>
      )}
      <Title level={2} className={styles.productTitle} style={{ margin: 0 }}>
        {name}
      </Title>
      <div className={styles.priceRow}>
        <span className={styles.price}>
          {formatPrice(product.price ?? 0, "AMD", i18n.language)}
        </span>
        <Tag
          className={
            isAvailable ? styles.availabilityTag : styles.availabilityTagOutOfStock
          }
        >
          {isAvailable ? t("product.available") : t("product.outOfStock")}
        </Tag>
      </div>
      {description !== "" && (
        <Paragraph className={styles.description} style={{ marginBottom: 0 }}>
          {description}
        </Paragraph>
      )}
      <div>
        <span className={styles.quantityLabel}>{t("product.quantity")}</span>
        <div className={styles.quantityWrapper}>
          <div className={styles.quantityControls}>
            <Button
              type="text"
              icon={<MinusOutlined />}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className={styles.quantityBtn}
              aria-label={t("product.quantityDecrease")}
            />
            <span className={styles.quantityValue}>{quantity}</span>
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => setQuantity((q) => q + 1)}
              className={styles.quantityBtn}
              aria-label={t("product.quantityIncrease")}
            />
          </div>
        </div>
      </div>
      <div className={styles.ctaButton}>
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          disabled={!isAvailable}
          block
          className={styles.orderButton}
          onClick={() => setOrderModalOpen(true)}
        >
          {isAvailable ? t("product.addToCart") : t("product.unavailable")}
        </Button>
      </div>
      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        productName={name}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default ProductInfo;
