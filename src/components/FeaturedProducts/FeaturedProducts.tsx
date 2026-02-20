import { Spin, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard/ProductCard";
import CardGrid from "@/components/CardGrid/CardGrid";
import type { Product } from "@/types/product";
import styles from "./FeaturedProducts.module.css";

const { Title } = Typography;

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
}

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
