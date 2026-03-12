import { useEffect, useState } from "react";
import { Table, Typography, Flex, App, Image, Tooltip } from "antd";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminOrdersApi } from "src/api/adminOrders";
import { buildProductPath } from "src/consts/routes";
import type { OrderListItem, PagedOrdersResponse } from "src/types/order";
import type { ColumnsType } from "antd/es/table";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const AdminOrdersPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const [data, setData] = useState<PagedOrdersResponse>({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchOrders = (pageNum: number, pageSizeNum: number) => {
    setLoading(true);
    adminOrdersApi
      .getAll({ Page: String(pageNum), PageSize: String(pageSizeNum) })
      .then((res) =>
        setData({
          items: res.items ?? [],
          page: res.page,
          pageSize: res.pageSize,
          total: res.total,
        }),
      )
      .catch(() => {
        setData({ items: [], page: 1, pageSize: 10, total: 0 });
        void message.error(t("admin.loadListFailed"));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(1, 10);
  }, []);

  const columns: ColumnsType<OrderListItem> = [
    {
      title: t("admin.columnQuantity"),
      dataIndex: "count",
      key: "count",
      width: 90,
      align: "center",
      render: (_: unknown, record: OrderListItem) =>
        record.count ?? record.product?.count ?? "—",
    },
    {
      title: t("admin.columnProduct"),
      key: "product",
      width: 220,
      render: (_: unknown, record: OrderListItem) => {
        const product = record.product;
        if (!product) return "—";
        const name = product.name ?? "—";
        const img = product.mainImageUrl ? (
          <Image
            src={product.mainImageUrl}
            alt=""
            width={48}
            height={48}
            style={{ objectFit: "cover", borderRadius: 6 }}
            preview={{ mask: t("admin.columnImage") }}
          />
        ) : null;
        const link =
          product.slug ?
            <a
              href={buildProductPath(product.slug)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </a>
          : name;
        return (
          <Flex align="center" gap="small" style={{ minWidth: 0 }}>
            {img}
            <Text
              style={{ flex: 1, minWidth: 0 }}
              ellipsis={{ tooltip: name }}
            >
              {link}
            </Text>
          </Flex>
        );
      },
    },
    {
      title: t("admin.columnCustomer"),
      dataIndex: "customerName",
      key: "customerName",
      width: 140,
      render: (v: string | null) => v ?? "—",
    },
    {
      title: t("admin.columnPhone"),
      dataIndex: "phone",
      key: "phone",
      width: 160,
      render: (v: string | null) => {
        if (!v) return "—";
        return (
          <Text
            copyable={{ text: v }}
            style={{ whiteSpace: "nowrap" }}
          >
            <a href={`tel:${v}`}>{v}</a>
          </Text>
        );
      },
    },
    {
      title: t("admin.columnEmail"),
      dataIndex: "email",
      key: "email",
      width: 260,
      render: (v: string | null) => {
        if (!v) return "—";
        return (
          <Text
            copyable={{ text: v }}
            style={{ whiteSpace: "nowrap" }}
          >
            <a href={`mailto:${v}`}>{v}</a>
          </Text>
        );
      },
    },
    {
      title: t("admin.columnMessage"),
      dataIndex: "message",
      key: "message",
      width: 200,
      ellipsis: true,
      render: (msg: string | null) => {
        if (msg == null || msg === "") return "—";
        return (
          <Tooltip title={msg}>
            <span className={styles.ellipsisCell}>{msg}</span>
          </Tooltip>
        );
      },
    },
    {
      title: t("admin.columnDate"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 165,
      render: (date: string) =>
        date ?
          new Date(date).toLocaleString(language, {
            dateStyle: "short",
            timeStyle: "short",
          })
        : "—",
      sorter: (a, b) =>
        new Date(a.createdAt ?? 0).getTime() -
        new Date(b.createdAt ?? 0).getTime(),
    },
  ];

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    const nextPage = pagination.current ?? 1;
    const nextSize = pagination.pageSize ?? data.pageSize;
    fetchOrders(nextPage, nextSize);
  };

  return (
    <>
      <Title level={2}>{t("admin.orders")}</Title>
      <Flex vertical gap="middle">
        <Table<OrderListItem>
          className={styles.ordersTable}
          dataSource={data.items ?? []}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: data.page,
            pageSize: data.pageSize,
            total: data.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (totalCount) =>
              t("admin.paginationTotal", { total: totalCount }),
          }}
          onChange={handleTableChange}
        />
      </Flex>
    </>
  );
};

export default AdminOrdersPage;
