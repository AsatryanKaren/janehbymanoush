import { useEffect, useState } from "react";
import { Button, Spin, Typography, Flex } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { productsApi } from "@/api/products.api";
import { ROUTES } from "@/consts/routes";
import { MOCK_PRODUCTS } from "@/mocks/products";
import type { Product } from "@/types/product";
import styles from "./HomePage.module.css";

const { Title, Paragraph } = Typography;

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi
      .getAll({ limit: 4 })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts(MOCK_PRODUCTS.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Flex vertical align="center" className={styles.hero}>
        <Title level={1} className={styles.heroTitle}>
          {t("home.title")}
        </Title>
        <Paragraph type="secondary" className={styles.heroSubtitle}>
          {t("home.subtitle")}
        </Paragraph>
        <Link to={ROUTES.WOMEN}>
          <Button type="primary" size="large">
            {t("home.shopWomen")}
          </Button>
        </Link>
      </Flex>

      <div className={styles.featured}>
        <Title level={2} className={styles.sectionTitle}>
          {t("home.featuredPieces")}
        </Title>
        {loading ? (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <CardGrid preset="product">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CardGrid>
        )}
      </div>
    </>
  );
};
