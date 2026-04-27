import { Card, Tag, Typography, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildProductPath, buildProductPathWithCatalogReturn } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import {
  getProductName,
  getProductCategoryName,
  getProductCollectionName,
} from "src/utils/productLocale";
import { useCart } from "src/app/providers/CartProvider";
import { cartItemFromProduct } from "src/utils/cartItemFromProduct";
import type { ProductCardProps } from "./types";
import { CATEGORY_KEY_MAP } from "./consts";
import styles from "./styles.module.css";

const { Text } = Typography;

const DEFAULT_CURRENCY = "AMD";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  catalogReturnLocation,
}) => {
  const { t, i18n } = useTranslation();
  const { addItem, setOpenSidebar } = useCart();
  const coverImage = product.mainImageUrl ?? "/placeholder.jpg";
  const category = product.category ?? "";
  const categoryKey = category && CATEGORY_KEY_MAP[category]
    ? `product.${CATEGORY_KEY_MAP[category]}`
    : null;
  const localizedCategory = getProductCategoryName(product, i18n.language);
  const categoryLabel = categoryKey
    ? t(categoryKey)
    : localizedCategory || (product.categoryName ?? category);
  const showCategoryTag = Boolean(categoryLabel);
  const slug = product.slug ?? product.id;
  const name = getProductName(product, i18n.language);
  const productTo =
    catalogReturnLocation != null && catalogReturnLocation !== ""
      ? buildProductPathWithCatalogReturn(slug, catalogReturnLocation)
      : buildProductPath(slug);
  const isAvailable = product.isActive !== false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addItem(cartItemFromProduct(product));
    setOpenSidebar(true);
  };

  return (
    <Link to={productTo} className={styles.link}>
      <Card
        hoverable
        className={styles.card}
        cover={
          <img
            className={styles.image}
            alt={name}
            src={encodeURI(coverImage)}
            loading="lazy"
          />
        }
      >
        {variant === "compact" ? (
          <div className={styles.compactMeta}>
            {showCategoryTag && (
              <Text className={styles.compactCategory}>{categoryLabel}</Text>
            )}
            <Text className={styles.compactCollection}>
              {getProductCollectionName(product, i18n.language)}
            </Text>
            <div className={styles.priceRow}>
              <Text strong className={styles.price}>
                {formatPrice(
                  product.price ?? 0,
                  DEFAULT_CURRENCY,
                  i18n.language,
                )}
              </Text>
              {isAvailable && (
                <Button
                  type="primary"
                  size="small"
                  icon={<HeartOutlined />}
                  className={styles.addToCartBtnCompact}
                  onClick={handleAddToCart}
                  aria-label={t("cart.addToCart")}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.meta}>
            <div className={styles.titleRow}>
              <Text className={styles.title} ellipsis>
                {name}
              </Text>
              {showCategoryTag && (
                <Tag className={styles.categoryTag}>{categoryLabel}</Tag>
              )}
            </div>
            <div className={styles.priceRow}>
              <Text strong className={styles.price}>
                {formatPrice(
                  product.price ?? 0,
                  DEFAULT_CURRENCY,
                  i18n.language,
                )}
              </Text>
              <div className={styles.priceActions}>
                {product.isActive === false && (
                  <Text type="danger" className={styles.outOfStock}>
                    {t("product.outOfStock")}
                  </Text>
                )}
                {isAvailable && (
                  <Button
                    type="primary"
                    size="small"
                    icon={<HeartOutlined />}
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    aria-label={t("cart.addToCart")}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
