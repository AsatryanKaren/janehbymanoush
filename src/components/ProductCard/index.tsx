import { Card, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildProductPath } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import type { ProductCardProps } from "./types";
import { CATEGORY_KEY_MAP } from "./consts";
import styles from "./styles.module.css";

const { Text } = Typography;

const DEFAULT_CURRENCY = "AMD";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
}) => {
  const { t, i18n } = useTranslation();
  const coverImage = product.mainImageUrl ?? "/placeholder.jpg";
  const category = product.category ?? "";
  const categoryKey = category && CATEGORY_KEY_MAP[category]
    ? `product.${CATEGORY_KEY_MAP[category]}`
    : null;
  const categoryLabel = categoryKey
    ? t(categoryKey)
    : (product.categoryName ?? category);
  const showCategoryTag = Boolean(categoryLabel);
  const slug = product.slug ?? product.id;
  const name = product.name ?? "";

  return (
    <Link to={buildProductPath(slug)} className={styles.link}>
      <Card
        hoverable
        className={styles.card}
        cover={
          <img className={styles.image} alt={name} src={coverImage} />
        }
      >
        {variant === "compact" ? (
          <div className={styles.compactMeta}>
            {showCategoryTag && (
              <Text className={styles.compactCategory}>{categoryLabel}</Text>
            )}
            <Text className={styles.compactCollection}>
              {product.collectionName ?? ""}
            </Text>
            <Text strong className={styles.price}>
              {formatPrice(
                product.price ?? 0,
                DEFAULT_CURRENCY,
                i18n.language,
              )}
            </Text>
          </div>
        ) : (
          <div className={styles.meta}>
            <div className={styles.titleRow}>
              <span className={styles.title}>{name}</span>
              {showCategoryTag && (
                <Tag className={styles.categoryTag}>{categoryLabel}</Tag>
              )}
            </div>
            <Text strong className={styles.price}>
              {formatPrice(
                product.price ?? 0,
                DEFAULT_CURRENCY,
                i18n.language,
              )}
            </Text>
            {product.isActive === false && (
              <Text type="danger" className={styles.outOfStock}>
                {t("product.outOfStock")}
              </Text>
            )}
          </div>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
