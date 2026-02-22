import {
  Button,
  Table,
  Space,
  Popconfirm,
  Typography,
  Flex,
  Tag,
  App,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminCollectionsApi } from "src/api/adminCollections";
import { useAdminCollections } from "src/app/providers/AdminCollectionsProvider";
import {
  ROUTES,
  buildAdminCollectionEditPath,
} from "src/consts/routes";
import type { AdminCollectionItem } from "src/types/collection";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const getCollectionName = (
  row: AdminCollectionItem,
  locale: string,
): string => {
  if (locale === "hy" && row.nameHy) return row.nameHy;
  if (locale === "ru" && row.nameRu) return row.nameRu;
  return row.nameEn ?? row.nameHy ?? row.nameRu ?? row.name ?? "";
};

const AdminCollectionsListPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { collections: items, loading, refetch } = useAdminCollections();

  const handleDelete = async (id: string) => {
    try {
      await adminCollectionsApi.delete(id);
      void message.success(t("admin.deleteSuccess"));
      void refetch();
    } catch {
      void message.error(t("admin.deleteFailed"));
    }
  };

  const columns: ColumnsType<AdminCollectionItem> = [
    {
      title: t("admin.collections.columnName"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        getCollectionName(a, language).localeCompare(
          getCollectionName(b, language),
        ),
      render: (_: unknown, record: AdminCollectionItem) =>
        getCollectionName(record, language),
    },
    {
      title: t("admin.collections.columnSlug"),
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: t("admin.collections.columnCategories"),
      key: "categories",
      render: (_: unknown, record: AdminCollectionItem) => {
        const count = record.categories?.length ?? 0;
        return count > 0 ? (
          <Tag>{t("admin.collections.categoriesCount", { count })}</Tag>
        ) : (
          <span style={{ color: "#999" }}>—</span>
        );
      },
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_: unknown, record: AdminCollectionItem) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(buildAdminCollectionEditPath(record.id))}
            aria-label={t("admin.edit")}
          />
          <Popconfirm
            title={t("admin.collections.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
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
        <Title level={2}>{t("admin.collections.title")}</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_COLLECTION_NEW)}
        >
          {t("admin.collections.add")}
        </Button>
      </Flex>
      <Table<AdminCollectionItem>
        dataSource={items}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default AdminCollectionsListPage;
