import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Upload,
  Spin,
  Space,
  Typography,
  Flex,
  App,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { productsApi } from "@/api/products.api";
import { ROUTES } from "@/consts/routes";
import { ProductCategory } from "@/types/product";
import type { Product } from "@/types/product";

const { Title } = Typography;

const CATEGORY_OPTIONS = Object.values(ProductCategory).map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}));

export const AdminProductEditPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    productsApi
      .getById(id)
      .then((product) => {
        form.setFieldsValue(product);
      })
      .catch(() => {
        void message.error(t("admin.loadFailed"));
      })
      .finally(() => setLoading(false));
  }, [id, form, message, t]);

  const handleSubmit = async (values: Partial<Product>) => {
    if (!id) return;

    setSubmitting(true);
    try {
      await productsApi.update(id, values);
      void message.success(t("admin.updateSuccess"));
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch {
      void message.error(t("admin.updateFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <>
      <Title level={2}>{t("admin.editProduct")}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 720 }}
      >
        <Form.Item
          name="name"
          label={t("admin.productName")}
          rules={[
            { required: true, message: t("admin.productNameRequired") },
          ]}
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

        <Form.Item
          name="description"
          label={t("admin.description")}
          rules={[
            { required: true, message: t("admin.descriptionRequired") },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label={t("admin.price")}
          rules={[{ required: true, message: t("admin.priceRequired") }]}
        >
          <InputNumber min={0} precision={2} />
        </Form.Item>

        <Form.Item
          name="category"
          label={t("admin.category")}
          rules={[{ required: true, message: t("admin.categoryRequired") }]}
        >
          <Select options={CATEGORY_OPTIONS} />
        </Form.Item>

        <Form.Item
          name="inStock"
          label={t("admin.inStock")}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label={t("admin.images")}>
          <Upload listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>{t("admin.uploadImage")}</Button>
          </Upload>
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
