import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin, Empty, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard/ProductCard";
import CardGrid from "@/components/CardGrid/CardGrid";
import { productsApi } from "@/api/products.api";
import type { Product } from "@/types/product";
import { ROUTES } from "@/consts/routes";
import styles from "./CatalogPage.module.css";

const { Title } = Typography;

const CATEGORY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "women",
  [ROUTES.MEN]: "men",
};

const TITLE_KEY_MAP: Record<string, string> = {
  [ROUTES.WOMEN]: "catalog.womenCollection",
  [ROUTES.MEN]: "catalog.menCollection",
};

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
      .getAll({ category })
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
