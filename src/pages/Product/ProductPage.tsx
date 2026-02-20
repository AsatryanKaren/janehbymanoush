import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Spin, Tag, Button, Typography, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { productsApi } from "@/api/products.api";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";
import styles from "./ProductPage.module.css";

const { Title, Text, Paragraph } = Typography;

const ProductPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
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

  const coverImage = product.mainImageUrl ?? "/placeholder.jpg";

  return (
    <div className={styles.container}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={coverImage} alt={product.name} />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Flex vertical gap={16}>
            <Title level={2}>{product.name}</Title>
            <Text strong className={styles.price}>
              {formatPrice(product.price, product.currency, i18n.language)}
            </Text>
            <Flex gap={8}>
              <Tag color="gold">{product.category}</Tag>
              {!product.isActive && (
                <Tag color="red">{t("product.outOfStock")}</Tag>
              )}
            </Flex>
            {product.description != null && product.description !== "" && (
              <Paragraph type="secondary">{product.description}</Paragraph>
            )}
            <div>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                disabled={!product.isActive}
              >
                {product.isActive
                  ? t("product.addToCart")
                  : t("product.unavailable")}
              </Button>
            </div>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
