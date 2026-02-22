import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Popconfirm,
  Typography,
  Flex,
  Image,
  Tag,
  App,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminProductsApi } from "src/api/adminProducts";
import {
  ROUTES,
  buildAdminProductEditPath,
  buildAdminProductViewPath,
} from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import type { ProductCardAdmin } from "src/types/product";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const getProductName = (row: ProductCardAdmin, locale: string): string => {
  if (locale === "hy" && row.nameHy) return row.nameHy;
  if (locale === "ru" && row.nameRu) return row.nameRu;
  return row.nameEn ?? row.nameHy ?? row.nameRu ?? row.name ?? "";
};

const AdminProductsListPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductCardAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const fetchProducts = (pageNum = page, size = pageSize) => {
    setLoading(true);
    adminProductsApi
      .getAll({
        Page: String(pageNum),
        PageSize: String(size),
      })
      .then((res) => {
        setProducts(res.items ?? []);
        setTotal(res.total ?? 0);
        setPage(res.page ?? 1);
        setPageSize(res.pageSize ?? size);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
        void message.error(t("admin.loadListFailed"));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(1, pageSize);
  }, []);

  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    const nextPage = pagination.current ?? 1;
    const nextSize = pagination.pageSize ?? pageSize;
    setPage(nextPage);
    setPageSize(nextSize);
    fetchProducts(nextPage, nextSize);
  };

  const handleDelete = async (id: string) => {
    try {
      await adminProductsApi.delete(id);
      void message.success(t("admin.deleteSuccess"));
      fetchProducts(page, pageSize);
    } catch {
      void message.error(t("admin.deleteFailed"));
    }
  };

  const columns: ColumnsType<ProductCardAdmin> = [
    {
      title: t("admin.columnImage"),
      dataIndex: "mainImageUrl",
      key: "mainImageUrl",
      width: 80,
      render: (url: string) =>
        url ? (
          <Image
            src={url}
            alt=""
            width={48}
            height={48}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#999" }}>—</span>
        ),
    },
    {
      title: t("admin.columnName"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        getProductName(a, language).localeCompare(
          getProductName(b, language),
        ),
      render: (_: string, record: ProductCardAdmin) => (
        <Link to={buildAdminProductViewPath(record.id)}>
          {getProductName(record, language)}
        </Link>
      ),
    },
    {
      title: t("admin.columnCategory"),
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: t("admin.columnCollection"),
      dataIndex: "collectionName",
      key: "collectionName",
    },
    {
      title: t("admin.columnPrice"),
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        formatPrice(price ?? 0, "AMD", language),
      sorter: (a, b) => (a.price ?? 0) - (b.price ?? 0),
    },
    {
      title: t("admin.columnInStock"),
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) =>
        inStock ? (
          <Tag color="green">{t("common.yes")}</Tag>
        ) : (
          <Tag color="default">{t("common.no")}</Tag>
        ),
    },
    {
      title: t("admin.columnActive"),
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color="green">{t("common.yes")}</Tag>
        ) : (
          <Tag color="default">{t("common.no")}</Tag>
        ),
    },
    {
      title: t("admin.columnNew"),
      dataIndex: "isNew",
      key: "isNew",
      render: (isNew: boolean) =>
        isNew ? (
          <Tag color="blue">{t("common.yes")}</Tag>
        ) : (
          <Tag color="default">{t("common.no")}</Tag>
        ),
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_: unknown, record: ProductCardAdmin) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(buildAdminProductEditPath(record.id))}
            aria-label={t("admin.edit")}
          />
          <Popconfirm
            title={t("admin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              aria-label={t("admin.deleteProduct")}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex align="center" gap="large" wrap>
        <Title level={2}>{t("admin.products")}</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_PRODUCT_NEW)}
        >
          {t("admin.addProduct")}
        </Button>
      </Flex>
      <Table<ProductCardAdmin>
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 900 }}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          pageSizeOptions: ["12", "20", "50"],
          showTotal: (totalCount) =>
            t("admin.paginationTotal", { total: totalCount }),
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default AdminProductsListPage;
