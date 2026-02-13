import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildProductPath } from "@/consts/routes";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

const { Text } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const coverImage = product.images[0] ?? "/placeholder.jpg";

  return (
    <Link to={buildProductPath(product.slug)} className={styles.link}>
      <Card
        hoverable
        className={styles.card}
        cover={
          <img className={styles.image} alt={product.name} src={coverImage} />
        }
      >
        <Card.Meta
          title={product.name}
          description={
            <>
              <Text strong className={styles.price}>
                {formatPrice(product.price, product.currency, i18n.language)}
              </Text>
              {!product.inStock && (
                <div>
                  <Text type="danger">{t("product.outOfStock")}</Text>
                </div>
              )}
            </>
          }
        />
      </Card>
    </Link>
  );
};
