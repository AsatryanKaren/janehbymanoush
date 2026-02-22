import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin, Empty, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import ProductCard from "src/components/ProductCard";
import CardGrid from "src/components/CardGrid";
import { productsApi } from "src/api/products";
import type { Product } from "src/types/product";
import { CATEGORY_MAP, TITLE_KEY_MAP } from "./consts";
import styles from "./styles.module.css";

const { Title } = Typography;

const CatalogPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = CATEGORY_MAP[location.pathname];
  const titleKey = TITLE_KEY_MAP[location.pathname] ?? "catalog.catalog";

  useEffect(() => {
    setLoading(true);
    productsApi
      .getAll(category ? { Category: category } : undefined)
      .then((res) => setProducts(res.items ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className={styles.container}>
      <Title level={1} className={styles.title}>
        {t(titleKey)}
      </Title>

      {loading ? (
        <Flex justify="center">
          <Spin size="large" />
        </Flex>
      ) : products.length === 0 ? (
        <Empty description={t("catalog.noProducts")} />
      ) : (
        <CardGrid preset="product">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CardGrid>
      )}
    </div>
  );
};

export default CatalogPage;
