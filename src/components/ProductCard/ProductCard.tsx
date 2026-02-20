import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildProductPath } from "@/consts/routes";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

const { Text } = Typography;

const CATEGORY_KEY_MAP: Record<string, string> = {
  earrings: "categoryEarrings",
  necklaces: "categoryNecklaces",
  rings: "categoryRings",
  bracelets: "categoryBracelets",
};

interface ProductCardProps {
  product: Product;
  /** Compact: show only category, collection, price (e.g. Best Sellers) */
  variant?: "default" | "compact";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
}) => {
  const { t, i18n } = useTranslation();
  const coverImage = product.mainImageUrl ?? "/placeholder.jpg";
  const categoryKey = CATEGORY_KEY_MAP[product.category]
    ? `product.${CATEGORY_KEY_MAP[product.category]}`
    : null;

  return (
    <Link to={buildProductPath(product.slug)} className={styles.link}>
      <Card
        hoverable
        className={styles.card}
        cover={
          <img className={styles.image} alt={product.name} src={coverImage} />
        }
      >
        {variant === "compact" ? (
          <div className={styles.compactMeta}>
            {categoryKey && (
              <Text className={styles.compactCategory}>{t(categoryKey)}</Text>
            )}
            <Text className={styles.compactCollection}>
              {product.collectionName}
            </Text>
            <Text strong className={styles.price}>
              {formatPrice(product.price, product.currency, i18n.language)}
            </Text>
          </div>
        ) : (
          <Card.Meta
            title={product.name}
            description={
              <>
                <Text strong className={styles.price}>
                  {formatPrice(product.price, product.currency, i18n.language)}
                </Text>
                {!product.isActive && (
                  <div>
                    <Text type="danger">{t("product.outOfStock")}</Text>
                  </div>
                )}
              </>
            }
          />
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
