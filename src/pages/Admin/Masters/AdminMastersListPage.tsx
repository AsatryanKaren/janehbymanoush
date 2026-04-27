import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Popconfirm,
  Typography,
  Flex,
  App,
  Switch,
  Image,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminMastersApi } from "src/api/adminMasters";
import {
  ROUTES,
  buildAdminMasterEditPath,
} from "src/consts/routes";
import type { MasterAdminItem } from "src/types/master";
import type { ColumnsType } from "antd/es/table";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const getMasterDisplayName = (row: MasterAdminItem): string =>
  row.fullNameEn ?? row.fullNameHy ?? row.fullNameRu ?? "";

const AdminMastersListPage: React.FC = () => {
  const { t } = useAdminTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [items, setItems] = useState<MasterAdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminMastersApi
      .getAll()
      .then((res) => {
        setItems(res.items ?? []);
      })
      .catch(() => {
        void message.error(t("admin.loadListFailed"));
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [message, t]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = async (id: string) => {
    try {
      await adminMastersApi.delete(id);
      void message.success(t("admin.deleteSuccess"));
      void load();
    } catch {
      void message.error(t("admin.deleteFailed"));
    }
  };

  const handleActiveChange = async (record: MasterAdminItem, isActive: boolean) => {
    setStatusLoadingId(record.id);
    try {
      await adminMastersApi.updateStatus(record.id, { isActive });
      void message.success(t("admin.masters.statusUpdated"));
      setItems((prev) =>
        prev.map((m) => (m.id === record.id ? { ...m, isActive } : m)),
      );
    } catch {
      void message.error(t("admin.masters.statusUpdateFailed"));
    } finally {
      setStatusLoadingId(null);
    }
  };

  const columns: ColumnsType<MasterAdminItem> = [
    {
      title: t("admin.columnImage"),
      key: "image",
      width: 80,
      render: (_: unknown, record: MasterAdminItem) =>
        record.imageUrl ? (
          <Image
            src={record.imageUrl}
            alt=""
            width={48}
            height={48}
            className={styles.thumb}
            preview
          />
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: t("admin.columnName"),
      key: "name",
      sorter: (a, b) =>
        getMasterDisplayName(a).localeCompare(getMasterDisplayName(b)),
      render: (_: unknown, record: MasterAdminItem) =>
        getMasterDisplayName(record) || "—",
    },
    {
      title: t("admin.masters.columnRole"),
      key: "position",
      render: (_: unknown, record: MasterAdminItem) => {
        const r = record.positionEn ?? record.positionHy ?? record.positionRu;
        return r || <Text type="secondary">—</Text>;
      },
    },
    {
      title: t("admin.columnActive"),
      key: "isActive",
      width: 100,
      render: (_: unknown, record: MasterAdminItem) => (
        <Switch
          checked={record.isActive}
          loading={statusLoadingId === record.id}
          onChange={(checked) => void handleActiveChange(record, checked)}
          aria-label={t("admin.columnActive")}
        />
      ),
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_: unknown, record: MasterAdminItem) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(buildAdminMasterEditPath(record.id))}
            aria-label={t("admin.edit")}
          />
          <Popconfirm
            title={t("admin.masters.deleteConfirm")}
            onConfirm={() => void handleDelete(record.id)}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              aria-label={t("admin.delete")}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex align="center" gap="large" wrap>
        <Title level={2}>{t("admin.masters.title")}</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_MASTERS_NEW)}
        >
          {t("admin.masters.add")}
        </Button>
      </Flex>
      <Table<MasterAdminItem>
        dataSource={items}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default AdminMastersListPage;
