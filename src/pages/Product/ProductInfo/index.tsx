import { useState } from "react";
import { Button, InputNumber, Tag, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatPrice } from "src/utils/formatPrice";
import type { ProductInfoProps } from "./types";
import styles from "./styles.module.css";

const { Title, Text, Paragraph } = Typography;

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  name,
  description,
}) => {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const isAvailable = product.isActive !== false;

  return (
    <div className={styles.wrapper}>
      {product.collectionName && (
        <Text className={styles.collection}>{product.collectionName}</Text>
      )}
      <Title level={2} style={{ margin: 0 }}>
        {name}
      </Title>
      <div className={styles.priceRow}>
        <span className={styles.price}>
          {formatPrice(product.price ?? 0, "AMD", i18n.language)}
        </span>
        <Tag color={isAvailable ? "default" : "red"}>
          {isAvailable ? t("product.available") : t("product.outOfStock")}
        </Tag>
      </div>
      {description !== "" && (
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          {description}
        </Paragraph>
      )}
      <div>
        <span className={styles.quantityLabel}>{t("product.quantity")}</span>
        <div className={styles.quantityWrapper}>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(v) => setQuantity(v ?? 1)}
            style={{ width: "100%" }}
          />
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
        >
          {isAvailable ? t("product.addToCart") : t("product.unavailable")}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
