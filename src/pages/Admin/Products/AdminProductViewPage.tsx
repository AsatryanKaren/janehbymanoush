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
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminProductsApi } from "src/api/adminProducts";
import { ROUTES, buildAdminProductEditPath } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import type { ProductDetailsPublic } from "src/types/product";

const { Title, Text } = Typography;

const GENDER_LABELS: Record<number, string> = {
  0: "Women",
  1: "Men",
};

const getProductName = (row: ProductDetailsPublic, locale: string): string => {
  if (locale === "hy" && row.nameHy) return row.nameHy;
  if (locale === "ru" && row.nameRu) return row.nameRu;
  return row.nameEn ?? row.nameHy ?? row.nameRu ?? row.name ?? "";
};

const getDescription = (
  row: ProductDetailsPublic,
  locale: string,
): string | null => {
  if (locale === "hy" && row.descriptionHy) return row.descriptionHy;
  if (locale === "ru" && row.descriptionRu) return row.descriptionRu;
  return row.descriptionEn ?? row.description ?? null;
};

const getStory = (row: ProductDetailsPublic, locale: string): string | null => {
  if (locale === "hy" && row.storyHy) return row.storyHy;
  if (locale === "ru" && row.storyRu) return row.storyRu;
  return row.storyEn ?? row.story ?? null;
};

const AdminProductViewPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailsPublic | null>(null);
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
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
        >
          {t("admin.backToList")}
        </Button>
        <Text type="secondary">{t("admin.loadFailed")}</Text>
      </Flex>
    );
  }

  const name = getProductName(product, language);
  const description = getDescription(product, language);
  const story = getStory(product, language);
  const mainImage =
    product.images?.find((i) => i.isMain)?.url ?? product.images?.[0]?.url;

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
          {name}
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
          {mainImage && (
            <Image
              src={mainImage}
              alt={name}
              width={280}
              style={{ objectFit: "cover" }}
            />
          )}
          <Flex vertical flex={1} style={{ minWidth: 280 }}>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label={t("admin.columnName")}>
                {name}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.slug")}>
                {product.slug}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.gender")}>
                {GENDER_LABELS[product.gender ?? 0] ?? product.gender}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnCategory")}>
                {product.categoryName ?? product.category}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnCollection")}>
                {product.collectionName}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnPrice")}>
                {formatPrice(product.price ?? 0, "AMD", language)}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin.columnInStock")}>
                {product.isActive ? (
                  <Tag color="green">{t("common.yes")}</Tag>
                ) : (
                  <Tag color="default">{t("common.no")}</Tag>
                )}
              </Descriptions.Item>
              {description != null && description !== "" && (
                <Descriptions.Item label={t("admin.description")}>
                  {description}
                </Descriptions.Item>
              )}
              {story != null && story !== "" && (
                <Descriptions.Item label={t("admin.story")}>
                  {story}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Flex>
        </Flex>
        {product.images && product.images.length > 1 && (
          <Flex gap="small" wrap style={{ marginTop: 16 }}>
            {product.images.map((img) => (
              <Image
                key={img.id}
                src={img.url ?? undefined}
                alt=""
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            ))}
          </Flex>
        )}
      </Card>
    </>
  );
};

export default AdminProductViewPage;
