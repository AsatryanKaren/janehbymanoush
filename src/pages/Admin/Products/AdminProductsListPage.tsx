import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminProductsApi } from "src/api/adminProducts";
import {
  ROUTES,
  ADMIN_PRODUCTS_PAGE_PARAM,
  ADMIN_PRODUCTS_PAGE_SIZE_PARAM,
  buildAdminProductEditPath,
  buildAdminProductViewPath,
  buildAdminProductDuplicatePath,
  parseAdminProductsListQuery,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { page: urlPage, pageSize: urlPageSize } = useMemo(
    () => parseAdminProductsListQuery(searchParams),
    [searchParams],
  );
  const listPagination = useMemo(
    () => ({ page: urlPage, pageSize: urlPageSize }),
    [urlPage, urlPageSize],
  );
  const [products, setProducts] = useState<ProductCardAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(
    (pageNum: number, size: number) => {
      setLoading(true);
      adminProductsApi
        .getAll({
          Page: String(pageNum),
          PageSize: String(size),
        })
        .then((res) => {
          setProducts(res.items ?? []);
          setTotal(res.total ?? 0);
          const resolvedPage = res.page ?? pageNum;
          const resolvedSize = res.pageSize ?? size;
          if (resolvedPage !== urlPage || resolvedSize !== urlPageSize) {
            setSearchParams(
              (prev) => {
                const next = new URLSearchParams(prev);
                if (resolvedPage <= 1) next.delete(ADMIN_PRODUCTS_PAGE_PARAM);
                else next.set(ADMIN_PRODUCTS_PAGE_PARAM, String(resolvedPage));
                if (resolvedSize === 12) next.delete(ADMIN_PRODUCTS_PAGE_SIZE_PARAM);
                else next.set(ADMIN_PRODUCTS_PAGE_SIZE_PARAM, String(resolvedSize));
                return next;
              },
              { replace: true },
            );
          }
        })
        .catch(() => {
          setProducts([]);
          setTotal(0);
          void message.error(t("admin.loadListFailed"));
        })
        .finally(() => setLoading(false));
    },
    [message, setSearchParams, t, urlPage, urlPageSize],
  );

  useEffect(() => {
    fetchProducts(urlPage, urlPageSize);
  }, [fetchProducts, urlPage, urlPageSize]);

  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    const nextPage = pagination.current ?? 1;
    const nextSize = pagination.pageSize ?? urlPageSize;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (nextPage <= 1) next.delete(ADMIN_PRODUCTS_PAGE_PARAM);
      else next.set(ADMIN_PRODUCTS_PAGE_PARAM, String(nextPage));
      if (nextSize === 12) next.delete(ADMIN_PRODUCTS_PAGE_SIZE_PARAM);
      else next.set(ADMIN_PRODUCTS_PAGE_SIZE_PARAM, String(nextSize));
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await adminProductsApi.delete(id);
      void message.success(t("admin.deleteSuccess"));
      fetchProducts(urlPage, urlPageSize);
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
        <Link to={buildAdminProductViewPath(record.id, listPagination)}>
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
      width: 132,
      render: (_: unknown, record: ProductCardAdmin) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(buildAdminProductEditPath(record.id, listPagination))}
            aria-label={t("admin.edit")}
          />
          <Button
            type="text"
            icon={<CopyOutlined />}
            onClick={() =>
              navigate(buildAdminProductDuplicatePath(record.id, listPagination))
            }
            aria-label={t("admin.duplicateProduct")}
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
          current: urlPage,
          pageSize: urlPageSize,
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
