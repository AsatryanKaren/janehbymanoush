import { useEffect, useState } from "react";
import { Table, Typography, Flex, App } from "antd";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminOrdersApi } from "src/api/adminOrders";
import type { OrderListItem, PagedOrdersResponse } from "src/types/order";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

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
      title: t("admin.columnOrderId"),
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (id: string) => id?.slice(0, 8) ?? "—",
    },
    {
      title: t("admin.columnCustomer"),
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: t("admin.columnEmail"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("admin.columnPhone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("admin.columnProduct"),
      key: "product",
      render: (_: unknown, record: OrderListItem) =>
        record.product?.name ?? "—",
    },
    {
      title: t("admin.columnDate"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString(language) : "—",
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
          dataSource={data.items ?? []}
          columns={columns}
          rowKey="id"
          loading={loading}
          scroll={{ x: 800 }}
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
