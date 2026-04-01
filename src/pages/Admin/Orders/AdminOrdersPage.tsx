import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Typography, Flex, App, Image, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminOrdersApi } from "src/api/adminOrders";
import { buildAdminOrderPath, buildProductPath } from "src/consts/routes";
import type { OrderListItem, PagedOrdersResponse } from "src/types/order";
import type { ColumnsType } from "antd/es/table";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const AdminOrdersPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
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
      title: "",
      key: "open",
      width: 56,
      align: "center",
      fixed: "left",
      onHeaderCell: () => ({
        "aria-label": t("admin.openOrderAria"),
      }),
      render: (_: unknown, record: OrderListItem) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          className={styles.viewOrderBtn}
          aria-label={t("admin.openOrderAria")}
          onClick={(e) => {
            e.stopPropagation();
            navigate(buildAdminOrderPath(record.id));
          }}
        />
      ),
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
            className={styles.productThumb}
            preview={{ mask: t("admin.columnImage") }}
          />
        ) : null;
        const link =
          product.slug ?
            <a
              href={buildProductPath(product.slug)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {name}
            </a>
          : name;
        const more = product.moreItems;
        const moreTag =
          typeof more === "number" && more > 0 ?
            <Tag color="blue">{t("admin.moreItemsTag", { count: more })}</Tag>
          : null;
        return (
          <Flex align="center" gap="small" className={styles.productCell} wrap="wrap">
            {img}
            <Text className={styles.productCellText} ellipsis={{ tooltip: name }}>
              {link}
            </Text>
            {moreTag}
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
          <Text copyable={{ text: v }} className={styles.nowrapCell}>
            <a href={`tel:${v}`} onClick={(e) => e.stopPropagation()}>
              {v}
            </a>
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
          <Text copyable={{ text: v }} className={styles.nowrapCell}>
            <a href={`mailto:${v}`} onClick={(e) => e.stopPropagation()}>
              {v}
            </a>
          </Text>
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
    {
      title: t("admin.columnQuantity"),
      dataIndex: "count",
      key: "count",
      width: 90,
      align: "center",
      fixed: "right",
      render: (_: unknown, record: OrderListItem) =>
        record.count ?? record.product?.count ?? "—",
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
      <Flex vertical gap="small" className={styles.pageHeading}>
        <Title level={2} className={styles.pageTitle}>
          {t("admin.orders")}
        </Title>
        <Text type="secondary">{t("admin.ordersListHint")}</Text>
      </Flex>
      <Flex vertical gap="middle">
        <Table<OrderListItem>
          className={styles.ordersTable}
          dataSource={data.items ?? []}
          columns={columns}
          rowKey="id"
          loading={loading}
          scroll={{ x: "max-content" }}
          onRow={(record) => ({
            onClick: () => navigate(buildAdminOrderPath(record.id)),
          })}
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
