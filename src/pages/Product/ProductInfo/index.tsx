import { useState } from "react";
import { Button, Tag, Typography } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import RingSizeSelector from "src/components/RingSizeSelector";
import { useCart } from "src/app/providers/CartProvider";
import { cartItemFromProduct } from "src/utils/cartItemFromProduct";
import { isRingCategoryName } from "src/utils/isRingItem";
import { GENDER_I18N_KEYS, genderFromApi } from "src/types/product";
import { formatPrice } from "src/utils/formatPrice";
import type { ProductInfoProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph } = Typography;

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  name,
  description,
}) => {
  const { t, i18n } = useTranslation();
  const { addItem, setOpenSidebar } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [ringSize, setRingSize] = useState<number | null>(null);
  const [ringSizeIsCustom, setRingSizeIsCustom] = useState(false);

  const isAvailable = product.isActive !== false;
  const gender =
    product.gender !== undefined && product.gender !== null
      ? genderFromApi(product.gender)
      : null;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem(
      {
        ...cartItemFromProduct(product),
        ...(ringSize != null && { ringSize, ringSizeIsCustom }),
      },
      quantity,
    );
    setOpenSidebar(true);
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
        {gender !== null && (
          <Tag>{t(GENDER_I18N_KEYS[gender])}</Tag>
        )}
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
      {isRingCategoryName(product.categoryName) && (
        <RingSizeSelector
          value={ringSize}
          isCustom={ringSizeIsCustom}
          onChange={(value, isCustom) => {
            setRingSize(value);
            setRingSizeIsCustom(isCustom);
          }}
        />
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
      <div className={styles.jewelryDetails}>
        <SafetyCertificateOutlined className={styles.jewelryDetailsIcon} />
        <span>{t("product.jewelryDetails")}</span>
      </div>
      <div className={styles.ctaButton}>
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          disabled={!isAvailable}
          block
          className={styles.orderButton}
          onClick={handleAddToCart}
        >
          {isAvailable ? t("product.addToCart") : t("product.unavailable")}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
