import {
  Button,
  Table,
  Space,
  Popconfirm,
  Typography,
  Flex,
  App,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminCategoriesApi } from "src/api/adminCategories";
import { useAdminCategories } from "src/app/providers/AdminCategoriesProvider";
import {
  ROUTES,
  buildAdminCategoryEditPath,
} from "src/consts/routes";
import type { CategoryItem } from "src/types/category";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const getCategoryTitle = (row: CategoryItem, locale: string): string => {
  if (locale === "hy" && row.titleHy) return row.titleHy;
  if (locale === "ru" && row.titleRu) return row.titleRu;
  return row.titleEn ?? row.titleHy ?? row.titleRu ?? row.title ?? "";
};

const AdminCategoriesListPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { categories: items, loading, refetch } = useAdminCategories();

  const handleDelete = async (id: string) => {
    try {
      await adminCategoriesApi.delete(id);
      void message.success(t("admin.deleteSuccess"));
      void refetch();
    } catch {
      void message.error(t("admin.deleteFailed"));
    }
  };

  const columns: ColumnsType<CategoryItem> = [
    {
      title: t("admin.categories.columnTitle"),
      key: "title",
      sorter: (a, b) =>
        getCategoryTitle(a, language).localeCompare(
          getCategoryTitle(b, language),
        ),
      render: (_: unknown, record: CategoryItem) =>
        getCategoryTitle(record, language),
    },
    {
      title: t("admin.categories.columnCollection"),
      dataIndex: "collectionName",
      key: "collectionName",
    },
    {
      title: t("admin.columnActions"),
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_: unknown, record: CategoryItem) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(buildAdminCategoryEditPath(record.id))}
            aria-label={t("admin.edit")}
          />
          <Popconfirm
            title={t("admin.categories.deleteConfirm")}
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
        <Title level={2}>{t("admin.categories.title")}</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_CATEGORY_NEW)}
        >
          {t("admin.categories.add")}
        </Button>
      </Flex>
      <Table<CategoryItem>
        dataSource={items}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default AdminCategoriesListPage;
