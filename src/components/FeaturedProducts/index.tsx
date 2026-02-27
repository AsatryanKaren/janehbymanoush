import { Spin, Typography, Flex } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "src/components/ProductCard";
import CardGrid from "src/components/CardGrid";
import { ROUTES } from "src/consts/routes";
import type { FeaturedProductsProps } from "./types";
import styles from "./styles.module.css";

const { Title } = Typography;

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>
              {t("home.bestSellersLabel")}
            </span>
            <Title level={2} className={styles.title}>
              {t("home.bestSellers")}
            </Title>
          </div>
          <Link to={ROUTES.CATALOG} className={styles.viewAll}>
            {t("home.viewAll")}
          </Link>
        </div>
        <div className={styles.tray}>
          {loading ? (
            <Flex justify="center" align="center" className={styles.loaderWrap}>
              <Spin size="large" />
            </Flex>
          ) : (
            <CardGrid preset="product">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="compact"
                />
              ))}
            </CardGrid>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
