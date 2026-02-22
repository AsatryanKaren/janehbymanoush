import { Spin, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import ProductCard from "src/components/ProductCard";
import CardGrid from "src/components/CardGrid";
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
      <Title level={2} className={styles.title}>
        {t("home.bestSellers")}
      </Title>
      {loading ? (
        <Flex justify="center">
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
    </section>
  );
};

export default FeaturedProducts;
