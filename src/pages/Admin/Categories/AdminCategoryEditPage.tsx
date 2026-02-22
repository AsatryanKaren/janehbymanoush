import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Spin,
  Space,
  Typography,
  Flex,
  App,
  Select,
  Card,
  Row,
  Col,
} from "antd";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminCategoriesApi } from "src/api/adminCategories";
import { ROUTES } from "src/consts/routes";
import { useAdminCategories } from "src/app/providers/AdminCategoriesProvider";
import { useAdminCollections } from "src/app/providers/AdminCollectionsProvider";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "src/types/category";
import type { AdminCollectionItem } from "src/types/collection";

const { Title } = Typography;

interface CategoryFormValues {
  collectionId?: string;
  titleHy?: string;
  titleEn?: string;
  titleRu?: string;
  value?: number;
}

const isCreateMode = (id: string | undefined): boolean =>
  id === undefined || id === "new";

const getCollectionName = (
  row: AdminCollectionItem,
  locale: string,
): string => {
  if (locale === "hy" && row.nameHy) return row.nameHy;
  if (locale === "ru" && row.nameRu) return row.nameRu;
  return row.nameEn ?? row.nameHy ?? row.nameRu ?? row.name ?? "";
};

const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card size="small" title={title} style={{ marginBottom: 16 }}>
    {children}
  </Card>
);

const AdminCategoryEditPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { refetch: refetchCategories } = useAdminCategories();
  const { collections } = useAdminCollections();
  const [form] = Form.useForm<CategoryFormValues>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const create = isCreateMode(id);

  const collectionOptions = collections.map((c) => ({
    label: getCollectionName(c, language),
    value: c.id,
  }));

  useEffect(() => {
    if (create) return;

    setLoading(true);
    adminCategoriesApi
      .getAll()
      .then((res) => {
        const category = res.items?.find((item) => item.id === id);
        if (category) {
          form.setFieldsValue({
            collectionId: category.collectionId ?? undefined,
            titleHy: category.titleHy ?? undefined,
            titleEn: category.titleEn ?? undefined,
            titleRu: category.titleRu ?? undefined,
          });
        } else {
          void message.error(t("admin.categories.notFound"));
        }
      })
      .catch(() => void message.error(t("admin.loadFailed")))
      .finally(() => setLoading(false));
  }, [id, create, form, message, t]);

  const handleSubmit = async (values: CategoryFormValues) => {
    setSubmitting(true);
    try {
      const body: CreateCategoryRequest & UpdateCategoryRequest = {
        collectionId: values.collectionId ?? null,
        titleHy: values.titleHy ?? null,
        titleEn: values.titleEn ?? null,
        titleRu: values.titleRu ?? null,
      };
      if (!create && values.value !== undefined)
        (body as UpdateCategoryRequest).value = values.value;
      if (create) {
        await adminCategoriesApi.create(body);
        void message.success(t("admin.createSuccess"));
      } else {
        await adminCategoriesApi.update(id!, body);
        void message.success(t("admin.updateSuccess"));
      }
      void refetchCategories();
      navigate(ROUTES.ADMIN_CATEGORIES);
    } catch {
      void message.error(
        create ? t("admin.createFailed") : t("admin.updateFailed"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!create && loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 200 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <>
      <Title level={2}>
        {create ? t("admin.categories.add") : t("admin.categories.edit")}
      </Title>
      <Form<CategoryFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 960 }}
      >
        <FormSection title={t("admin.categories.sectionBasic")}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="collectionId"
                label={t("admin.categories.columnCollection")}
                rules={[
                  { required: true, message: t("admin.categories.collectionRequired") },
                ]}
              >
                <Select
                  options={collectionOptions}
                  placeholder={t("admin.categories.collectionRequired")}
                  loading={collectionOptions.length === 0}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="titleHy"
                label={t("admin.categories.fieldTitle") + " (HY)"}
              >
                <Input placeholder={t("admin.categories.fieldTitle")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="titleEn"
                label={t("admin.categories.fieldTitle") + " (EN)"}
              >
                <Input placeholder={t("admin.categories.fieldTitle")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="titleRu"
                label={t("admin.categories.fieldTitle") + " (RU)"}
              >
                <Input placeholder={t("admin.categories.fieldTitle")} />
              </Form.Item>
            </Col>
            {!create && (
              <Col xs={24} md={8}>
                <Form.Item name="value" label={t("admin.categories.fieldValue")}>
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            )}
          </Row>
        </FormSection>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {create ? t("admin.create") : t("admin.save")}
            </Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_CATEGORIES)}>
              {t("admin.cancel")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminCategoryEditPage;
