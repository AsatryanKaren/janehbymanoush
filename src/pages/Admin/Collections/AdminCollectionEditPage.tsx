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
} from "antd";
import { useTranslation } from "react-i18next";
import { adminCollectionsApi } from "@/api/adminCollections.api";
import { ROUTES } from "@/consts/routes";
import type { AdminCollectionBody } from "@/types/collection";

const { Title } = Typography;

const isCreateMode = (id: string | undefined): boolean =>
  id === undefined || id === "new";

const AdminCollectionEditPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
            name: collection.name,
            slug: collection.slug,
            sortOrder: collection.sortOrder,
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

  const handleSubmit = async (values: AdminCollectionBody) => {
    setSubmitting(true);
    try {
      if (create) {
        await adminCollectionsApi.create(values);
        void message.success(t("admin.createSuccess"));
      } else {
        await adminCollectionsApi.update(id!, values);
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
      <Form<AdminCollectionBody>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ sortOrder: 0 }}
      >
        <Form.Item
          name="name"
          label={t("admin.collections.fieldName")}
          rules={[{ required: true, message: t("admin.collections.nameRequired") }]}
        >
          <Input placeholder={t("admin.collections.fieldName")} />
        </Form.Item>
        <Form.Item
          name="slug"
          label={t("admin.collections.fieldSlug")}
          rules={[{ required: true, message: t("admin.collections.slugRequired") }]}
        >
          <Input placeholder={t("admin.collections.fieldSlug")} />
        </Form.Item>
        <Form.Item
          name="sortOrder"
          label={t("admin.collections.fieldSortOrder")}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
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
