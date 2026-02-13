import { useEffect, useState } from "react";
import { Button, Table, Space, Popconfirm, Typography, Flex } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productsApi } from "@/api/products.api";
import { buildAdminProductEditPath } from "@/consts/routes";
import { formatPrice } from "@/utils/formatPrice";
import type { Product } from "@/types/product";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

export const AdminProductsListPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    productsApi
      .getAll()
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await productsApi.delete(id);
    fetchProducts();
  };

  const columns: ColumnsType<Product> = [
    {
      title: t("admin.columnName"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("admin.columnCategory"),
      dataIndex: "category",
      key: "category",
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
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) =>
        inStock ? t("common.yes") : t("common.no"),
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      render: (_: unknown, record: Product) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(buildAdminProductEditPath(record.id))}
          >
            {t("admin.edit")}
          </Button>
          <Popconfirm
            title={t("admin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              {t("admin.deleteProduct")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex align="center" gap="large" wrap>
        <Title level={2}>{t("admin.products")}</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          {t("admin.addProduct")}
        </Button>
      </Flex>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 800 }}
      />
    </>
  );
};
