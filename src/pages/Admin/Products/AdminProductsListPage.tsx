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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { adminProductsApi } from "@/api/adminProducts.api";
import { ROUTES, buildAdminProductEditPath, buildAdminProductViewPath } from "@/consts/routes";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const AdminProductsListPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const fetchProducts = (pageNum = page, size = pageSize) => {
    setLoading(true);
    adminProductsApi
      .getAll({ page: pageNum, pageSize: size })
      .then((res) => {
        setProducts(res.items ?? []);
        setTotal(res.total ?? 0);
        setPage(res.page ?? 1);
        setPageSize(res.pageSize ?? size);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
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
    await adminProductsApi.delete(id);
    fetchProducts(page, pageSize);
  };

  const columns: ColumnsType<Product> = [
    {
      title: t("admin.columnImage"),
      dataIndex: "mainImageUrl",
      key: "mainImageUrl",
      width: 80,
      render: (url: string) =>
        url ? (
          <Image src={url} alt="" width={48} height={48} style={{ objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#999" }}>—</span>
        ),
    },
    {
      title: t("admin.columnName"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record: Product) => (
        <Link to={buildAdminProductViewPath(record.id)}>{name}</Link>
      ),
    },
    {
      title: t("admin.columnCategory"),
      dataIndex: "category",
      key: "category",
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
      render: (price: number, record: Product) =>
        formatPrice(price, record.currency, i18n.language),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: t("admin.columnInStock"),
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
      title: t("admin.columnActions"),
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_: unknown, record: Product) => (
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
            <Button type="text" danger icon={<DeleteOutlined />} aria-label={t("admin.deleteProduct")} />
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
      <Table<Product>
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
