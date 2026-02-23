import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Spin,
  Space,
  Typography,
  Flex,
  App,
  Card,
  Row,
  Col,
} from "antd";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminCollectionsApi } from "src/api/adminCollections";
import { ROUTES } from "src/consts/routes";
import type {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "src/types/collection";
import type { CollectionFormValues } from "./types";

const { Title } = Typography;

const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card size="small" title={title} style={{ marginBottom: 16 }}>
    {children}
  </Card>
);

const isCreateMode = (id: string | undefined): boolean =>
  id === undefined || id === "new";

const AdminCollectionEditPage: React.FC = () => {
  const { t } = useAdminTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm<CollectionFormValues>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const create = isCreateMode(id);

  useEffect(() => {
    if (create) return;

    setLoading(true);
    adminCollectionsApi
      .getAll()
      .then((res) => {
        const collection = res.items?.find((item) => item.id === id);
        if (collection) {
          form.setFieldsValue({
            nameHy: collection.nameHy ?? undefined,
            nameEn: collection.nameEn ?? undefined,
            nameRu: collection.nameRu ?? undefined,
            slug: collection.slug ?? undefined,
          });
        } else {
          void message.error(t("admin.collections.notFound"));
        }
      })
      .catch(() => {
        void message.error(t("admin.loadFailed"));
      })
      .finally(() => setLoading(false));
  }, [id, create, form, message, t]);

  const handleSubmit = async (values: CollectionFormValues) => {
    setSubmitting(true);
    try {
      const body: CreateCollectionRequest & UpdateCollectionRequest = {
        nameHy: values.nameHy ?? null,
        nameEn: values.nameEn ?? null,
        nameRu: values.nameRu ?? null,
        slug: values.slug ?? null,
      };
      if (create) {
        await adminCollectionsApi.create(body);
        void message.success(t("admin.createSuccess"));
      } else {
        await adminCollectionsApi.update(id!, body);
        void message.success(t("admin.updateSuccess"));
      }
      navigate(ROUTES.ADMIN_COLLECTIONS);
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
        {create
          ? t("admin.collections.add")
          : t("admin.collections.edit")}
      </Title>
      <Form<CollectionFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 960 }}
      >
        <FormSection title={t("admin.collections.sectionBasic")}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="nameHy" label={t("admin.collections.fieldName") + " (HY)"}>
                <Input placeholder={t("admin.collections.fieldName")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="nameEn" label={t("admin.collections.fieldName") + " (EN)"}>
                <Input placeholder={t("admin.collections.fieldName")} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="nameRu" label={t("admin.collections.fieldName") + " (RU)"}>
                <Input placeholder={t("admin.collections.fieldName")} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="slug"
                label={t("admin.collections.fieldSlug")}
                rules={[{ required: true, message: t("admin.collections.slugRequired") }]}
              >
                <Input placeholder={t("admin.collections.fieldSlug")} />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {create ? t("admin.create") : t("admin.save")}
            </Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_COLLECTIONS)}>
              {t("admin.cancel")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminCollectionEditPage;
