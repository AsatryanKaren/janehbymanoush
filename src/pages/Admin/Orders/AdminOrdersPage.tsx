import { useEffect, useState } from "react";
import { Table, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ordersApi } from "src/api/orders.api";
import { formatPrice } from "src/utils/formatPrice";
import { OrderStatus } from "src/types/order";
import type { Order } from "src/types/order";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const STATUS_OPTIONS = Object.values(OrderStatus).map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}));

const AdminOrdersPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    ordersApi
      .getAll()
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    await ordersApi.updateStatus(orderId, status);
    fetchOrders();
  };

  const columns: ColumnsType<Order> = [
    {
      title: t("admin.columnOrderId"),
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: t("admin.columnCustomer"),
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: t("admin.columnEmail"),
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: t("admin.columnItems"),
      dataIndex: "items",
      key: "items",
      render: (items: Order["items"]) => items.length,
    },
    {
      title: t("admin.columnTotal"),
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number, record: Order) =>
        formatPrice(amount, record.currency, i18n.language),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: t("admin.columnStatus"),
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus, record: Order) => (
        <Select
          value={status}
          options={STATUS_OPTIONS}
          onChange={(value: OrderStatus) => handleStatusChange(record.id, value)}
        />
      ),
      filters: STATUS_OPTIONS.map((o) => ({ text: o.label, value: o.value })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t("admin.columnDate"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return (
    <>
      <Title level={2}>{t("admin.orders")}</Title>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default AdminOrdersPage;
