import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Spin,
  Space,
  Typography,
  Flex,
  App,
} from "antd";
import { useTranslation } from "react-i18next";
import { adminProductsApi } from "src/api/adminProducts.api";
import { ROUTES } from "src/consts/routes";
import { useAdminCategories } from "src/app/providers/AdminCategoriesProvider";
import { useAdminCollections } from "src/app/providers/AdminCollectionsProvider";

const { Title } = Typography;

const GENDER_OPTIONS = [
  { label: "Women", value: 0 },
  { label: "Men", value: 1 },
];

const isCreateMode = (id: string | undefined): boolean => id === undefined;

const AdminProductEditPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { categories } = useAdminCategories();
  const { collections } = useAdminCollections();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const create = isCreateMode(id);

  const categoryOptions = categories.map((c) => ({
    label: c.title,
    value: c.id,
  }));

  const collectionOptions = collections.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  useEffect(() => {
    if (create) return;

    setLoading(true);
    adminProductsApi
      .getById(id!)
      .then((product) => {
        form.setFieldsValue({
          ...product,
          categoryId: product.categoryId,
          collectionId: product.collectionId,
        });
      })
      .catch(() => {
        void message.error(t("admin.loadFailed"));
      })
      .finally(() => setLoading(false));
  }, [id, create, form, message, t]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    setSubmitting(true);
    try {
      const categoryId = values.categoryId as string;
      const selectedCategory = categories.find((c) => c.id === categoryId);

      if (create) {
        const createPayload = {
          name: values.name as string,
          slug: values.slug as string,
          gender: values.gender as number,
          category: selectedCategory?.key ?? "",
          categoryId,
          price: values.price as number,
          currency: (values.currency as string) ?? "AMD",
          description: (values.description as string) || undefined,
          story: (values.story as string) || undefined,
          isActive: (values.isActive as boolean) ?? true,
        };
        await adminProductsApi.create(createPayload);
        void message.success(t("admin.createSuccess"));
      } else {
        const updatePayload = {
          name: values.name as string,
          slug: values.slug as string,
          gender: values.gender as number,
          category: selectedCategory?.key ?? (values.category as string) ?? "",
          categoryId,
          price: values.price as number,
          currency: (values.currency as string) ?? "AMD",
          description: (values.description as string) || undefined,
          story: (values.story as string) || undefined,
          isActive: (values.isActive as boolean) ?? true,
        };
        await adminProductsApi.update(id!, updatePayload);
        void message.success(t("admin.updateSuccess"));
      }
      navigate(ROUTES.ADMIN_PRODUCTS);
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
      <Flex justify="center" align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <>
      <Title level={2}>
        {create ? t("admin.addProduct") : t("admin.editProduct")}
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 720 }}
        initialValues={{ currency: "AMD", isActive: true, gender: 0 }}
      >
        <Form.Item
          name="name"
          label={t("admin.productName")}
          rules={[{ required: true, message: t("admin.productNameRequired") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="slug"
          label={t("admin.slug")}
          rules={[{ required: true, message: t("admin.slugRequired") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label={t("admin.description")}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="story" label={t("admin.story")}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="gender"
          label={t("admin.gender")}
          rules={[{ required: true }]}
        >
          <Select options={GENDER_OPTIONS} />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label={t("admin.category")}
          rules={[{ required: true, message: t("admin.categoryRequired") }]}
        >
          <Select
            options={categoryOptions}
            placeholder={t("admin.categoryRequired")}
            loading={categoryOptions.length === 0}
          />
        </Form.Item>

        <Form.Item
          name="collectionId"
          label={t("admin.collection")}
          rules={[{ required: true, message: t("admin.collectionRequired") }]}
        >
          <Select
            options={collectionOptions}
            placeholder={t("admin.collectionRequired")}
            loading={collectionOptions.length === 0}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label={t("admin.price")}
          rules={[{ required: true, message: t("admin.priceRequired") }]}
        >
          <InputNumber min={0} precision={2} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="currency" label={t("admin.currency")}>
          <Select
            options={[
              { label: "AMD", value: "AMD" },
              { label: "USD", value: "USD" },
            ]}
          />
        </Form.Item>

        <Form.Item name="mainImageUrl" label={t("admin.mainImageUrl")}>
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item name="isActive" label={t("admin.inStock")} valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {t("admin.saveChanges")}
            </Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}>
              {t("admin.cancel")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminProductEditPage;
