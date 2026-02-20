import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Descriptions,
  Image,
  Spin,
  Tag,
  Typography,
  Flex,
  App,
} from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { adminProductsApi } from "@/api/adminProducts.api";
import { ROUTES, buildAdminProductEditPath } from "@/consts/routes";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";

const { Title, Text } = Typography;

const GENDER_LABELS: Record<number, string> = {
  0: "Women",
  1: "Men",
};

const AdminProductViewPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    adminProductsApi
      .getById(id)
      .then(setProduct)
      .catch(() => {
        void message.error(t("admin.loadFailed"));
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id, message, t]);

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 200 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!product) {
    return (
      <Flex vertical gap="middle">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}>
          {t("admin.backToList")}
        </Button>
        <Text type="secondary">{t("admin.loadFailed")}</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex align="center" gap="middle" wrap style={{ marginBottom: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
        >
          {t("admin.backToList")}
        </Button>
        <Title level={2} style={{ margin: 0 }}>
          {product.name}
        </Title>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(buildAdminProductEditPath(product.id))}
        >
          {t("admin.edit")}
        </Button>
      </Flex>

      <Card>
        <Flex gap={24} wrap>
          {product.mainImageUrl && (
            <Image
              src={product.mainImageUrl}
              alt={product.name}
              width={280}
              style={{ objectFit: "cover" }}
            />
          )}
          <Flex vertical flex={1} style={{ minWidth: 280 }}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label={t("admin.columnName")}>
                {product.name}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.slug")}>
                {product.slug}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.gender")}>
                {GENDER_LABELS[product.gender] ?? product.gender}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnCategory")}>
                {product.category}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnCollection")}>
                {product.collectionName}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnPrice")}>
                {formatPrice(product.price, product.currency)}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnInStock")}>
                {product.isActive ? (
                  <Tag color="green">{t("common.yes")}</Tag>
                ) : (
                  <Tag color="default">{t("common.no")}</Tag>
                )}
              </Descriptions.Item>
              {product.description != null && product.description !== "" && (
                <Descriptions.Item label={t("admin.description")}>
                  {product.description}
                </Descriptions.Item>
              )}
              {product.story != null && product.story !== "" && (
                <Descriptions.Item label={t("admin.story")}>
                  {product.story}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default AdminProductViewPage;
