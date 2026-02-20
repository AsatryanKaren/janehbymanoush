import {
  Button,
  Table,
  Space,
  Popconfirm,
  Typography,
  Flex,
  Tag,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { adminCollectionsApi } from "@/api/adminCollections.api";
import { useAdminCollections } from "@/app/providers/AdminCollectionsProvider";
import {
  ROUTES,
  buildAdminCollectionEditPath,
} from "@/consts/routes";
import type { AdminCollectionItem } from "@/types/collection";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const AdminCollectionsListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { collections: items, loading, refetch } = useAdminCollections();

  const handleDelete = async (id: string) => {
    await adminCollectionsApi.delete(id);
    void refetch();
  };

  const columns: ColumnsType<AdminCollectionItem> = [
    {
      title: t("admin.collections.columnName"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("admin.collections.columnSlug"),
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: t("admin.collections.columnSortOrder"),
      dataIndex: "sortOrder",
      key: "sortOrder",
      width: 120,
      sorter: (a, b) => a.sortOrder - b.sortOrder,
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
