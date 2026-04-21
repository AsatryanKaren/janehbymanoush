import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Col, Row, Spin, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { productsApi } from "src/api/products";
import { collectionsApi } from "src/api/collections";
import {
  ROUTES,
  PRODUCT_CATALOG_RETURN_PARAM,
  parseSafeCatalogReturnPath,
} from "src/consts/routes";
import {
  getProductName,
  getProductDescription,
  getProductStory,
  getProductCollectionName,
} from "src/utils/productLocale";
import type { ProductDetailsPublic } from "src/types/product";
import type { AdminCollectionItem } from "src/types/collection";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductStory from "./ProductStory";
import OurCollections from "src/components/OurCollections";
import styles from "./styles.module.css";

const { Text } = Typography;

const ProductPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const catalogBreadcrumbTo =
    parseSafeCatalogReturnPath(searchParams.get(PRODUCT_CATALOG_RETURN_PARAM)) ??
    ROUTES.CATALOG;
  const [product, setProduct] = useState<ProductDetailsPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<AdminCollectionItem[] | null>(
    null,
  );

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    productsApi
      .getBySlug(slug)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    void collectionsApi
      .getAll()
      .then((res) => setCollections(res.items ?? []))
      .catch(() => setCollections([]));
  }, []);

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
        <Text className={styles.notFoundText}>{t("product.notFound")}</Text>
      </div>
    );
  }

  const lang = i18n.language;
  const name = getProductName(product, lang);
  const description = getProductDescription(product, lang);
  const story = getProductStory(product, lang);
  const storyCollectionLabel = getProductCollectionName(product, lang);
  const backgroundImageUrl =
    product.mainImageUrl ??
    product.images?.find((img) => img.isMain)?.url ??
    product.images?.[0]?.url ??
    null;
  const storyImageUrl = product.storyImages?.[0]?.url ?? null;

  return (
    <>
      <div className={styles.container}>
        <Breadcrumb
          className={styles.breadcrumbs}
          items={[
            { title: <Link to={ROUTES.HOME}>{t("common.breadcrumbs.home")}</Link> },
            {
              title: (
                <Link to={catalogBreadcrumbTo}>{t("common.breadcrumbs.catalog")}</Link>
              ),
            },
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
        <ProductStory
          collectionName={storyCollectionLabel !== "" ? storyCollectionLabel : null}
          productName={name}
          storyText={story}
          storyImageUrl={storyImageUrl}
          backgroundImageUrl={backgroundImageUrl}
        />
      </div>
      <OurCollections collections={collections} />
    </>
  );
};

export default ProductPage;
