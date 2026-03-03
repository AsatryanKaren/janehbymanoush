import { useEffect, useState } from "react";
import {
  Typography,
  Flex,
  Table,
  App,
  Image,
  Button,
  Segmented,
  Alert,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { getBestsellers } from "src/api/bestsellers";
import { adminProductsApi } from "src/api/adminProducts";
import { buildProductPath } from "src/consts/routes";
import type { ProductCardPublic } from "src/types/product";
import type { ProductCardAdmin } from "src/types/product";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const MAX_BESTSELLERS = 4;
type SegmentValue = "add" | "list";

const getProductName = (
  row: ProductCardPublic | ProductCardAdmin,
  locale: string,
): string => {
  if (locale === "hy" && row.nameHy) return row.nameHy;
  if (locale === "ru" && row.nameRu) return row.nameRu;
  return row.nameEn ?? row.nameHy ?? row.nameRu ?? row.name ?? "";
};

const AdminBestsellersPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const [segment, setSegment] = useState<SegmentValue>("list");
  const [bestsellers, setBestsellers] = useState<ProductCardPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductCardAdmin[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchBestsellers = () => {
    setLoading(true);
    getBestsellers()
      .then((res) => setBestsellers(res.items ?? []))
      .catch(() => setBestsellers([]))
      .finally(() => setLoading(false));
  };

  const fetchProducts = () => {
    setProductsLoading(true);
    adminProductsApi
      .getAll({ PageSize: "200" })
      .then((res) => setProducts(res.items ?? []))
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  };

  useEffect(() => {
    fetchBestsellers();
  }, []);

  useEffect(() => {
    if (segment === "add" && products.length === 0 && !productsLoading) {
      fetchProducts();
    }
  }, [segment]);

  const bestsellerIds = new Set(bestsellers.map((p) => p.id));
  const productsToAdd = products.filter((p) => !bestsellerIds.has(p.id));
  const bestsellersLimitReached = bestsellers.length >= MAX_BESTSELLERS;

  const handleAdd = async (productId: string) => {
    setAddingId(productId);
    try {
      await adminProductsApi.setFeatured(productId, { isFeatured: true });
      void message.success(t("admin.bestsellers.addSuccess"));
      fetchBestsellers();
    } catch {
      void message.error(t("admin.featuredUpdateFailed"));
    } finally {
      setAddingId(null);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await adminProductsApi.setFeatured(id, { isFeatured: false });
      void message.success(t("admin.bestsellers.removeSuccess"));
      fetchBestsellers();
    } catch {
      void message.error(t("admin.featuredUpdateFailed"));
    } finally {
      setRemovingId(null);
    }
  };

  const renderProductCell = (record: ProductCardPublic | ProductCardAdmin) => {
    const name = getProductName(record, language);
    const slug = "slug" in record ? record.slug : null;
    const link = slug ? (
      <a
        href={buildProductPath(slug)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    ) : (
      name
    );
    return link;
  };

  const addColumns: ColumnsType<ProductCardAdmin> = [
    {
      title: t("admin.columnImage"),
      key: "mainImageUrl",
      width: 80,
      render: (_: unknown, record: ProductCardAdmin) =>
        record.mainImageUrl ? (
          <Image
            src={record.mainImageUrl}
            alt=""
            width={48}
            height={48}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        ) : (
          <span style={{ color: "#999" }}>—</span>
        ),
    },
    {
      title: t("admin.columnName"),
      key: "name",
      render: (_: unknown, record: ProductCardAdmin) =>
        renderProductCell(record),
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      width: 140,
      render: (_: unknown, record: ProductCardAdmin) => (
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          loading={addingId === record.id}
          disabled={addingId !== null || bestsellersLimitReached}
          onClick={() => handleAdd(record.id)}
        >
          {t("admin.bestsellers.addToBestsellers")}
        </Button>
      ),
    },
  ];

  const listColumns: ColumnsType<ProductCardPublic> = [
    {
      title: t("admin.columnImage"),
      key: "mainImageUrl",
      width: 80,
      render: (_: unknown, record: ProductCardPublic) =>
        record.mainImageUrl ? (
          <Image
            src={record.mainImageUrl}
            alt=""
            width={48}
            height={48}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        ) : (
          <span style={{ color: "#999" }}>—</span>
        ),
    },
    {
      title: t("admin.columnName"),
      key: "name",
      render: (_: unknown, record: ProductCardPublic) =>
        renderProductCell(record),
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      width: 120,
      render: (_: unknown, record: ProductCardPublic) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          loading={removingId === record.id}
          disabled={removingId !== null}
          onClick={() => handleRemove(record.id)}
        >
          {t("admin.bestsellers.remove")}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Title level={2}>{t("admin.bestsellers.title")}</Title>

      <Flex vertical gap="middle">
        <Segmented<SegmentValue>
          value={segment}
          onChange={setSegment}
          options={[
            { label: t("admin.bestsellers.segmentAdd"), value: "add" },
            { label: t("admin.bestsellers.segmentList"), value: "list" },
          ]}
        />

        {bestsellersLimitReached && (
          <Alert
            type="warning"
            showIcon
            message={t("admin.bestsellers.limitReached")}
          />
        )}

        {segment === "add" && (
          <Table<ProductCardAdmin>
            dataSource={productsToAdd}
            columns={addColumns}
            rowKey="id"
            loading={productsLoading}
            locale={{
              emptyText: t("admin.bestsellers.emptyProducts"),
            }}
            pagination={{ pageSize: 20 }}
          />
        )}

        {segment === "list" && (
          <Table<ProductCardPublic>
            dataSource={bestsellers}
            columns={listColumns}
            rowKey="id"
            loading={loading}
            locale={{
              emptyText: t("admin.bestsellers.empty"),
            }}
            pagination={false}
          />
        )}
      </Flex>
    </>
  );
};

export default AdminBestsellersPage;
