import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Col, Row, Spin, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { productsApi } from "src/api/products";
import { ROUTES } from "src/consts/routes";
import type { ProductDetailsPublic } from "src/types/product";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import OurCollections from "src/components/OurCollections";
import styles from "./styles.module.css";

const { Text } = Typography;

const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetailsPublic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    productsApi
      .getBySlug(slug)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Flex justify="center" className={styles.container}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <Text type="secondary">{t("product.notFound")}</Text>
      </div>
    );
  }

  const name =
    product.nameEn ?? product.nameHy ?? product.nameRu ?? product.name ?? "";
  const description =
    product.descriptionEn ??
    product.descriptionHy ??
    product.descriptionRu ??
    product.description ??
    "";

  return (
    <>
      <div className={styles.container}>
        <Breadcrumb
          className={styles.breadcrumbs}
          items={[
            { title: <Link to={ROUTES.HOME}>{t("common.breadcrumbs.home")}</Link> },
            { title: <Link to={ROUTES.CATALOG}>{t("common.breadcrumbs.catalog")}</Link> },
            { title: name },
          ]}
        />
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <ProductImages
              images={product.images}
              mainImageUrl={product.mainImageUrl}
              productName={name}
            />
          </Col>
          <Col xs={24} md={12}>
            <ProductInfo product={product} name={name} description={description} />
          </Col>
        </Row>
      </div>
      <OurCollections />
    </>
  );
};

export default ProductPage;
