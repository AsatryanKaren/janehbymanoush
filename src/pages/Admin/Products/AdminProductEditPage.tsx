import { Flex, Form, Spin, Typography } from "antd";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import type { ProductFormValues } from "./types";
import { useProductEditForm } from "./useProductEditForm";
import { ProductEditFormContent } from "./ProductEditFormContent";

const { Title } = Typography;

const AdminProductEditPage: React.FC = () => {
  const { t } = useAdminTranslation();
  const edit = useProductEditForm();

  if (!edit.create && edit.loading) {
    return (
      <Flex justify="center" align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <>
      <Title level={2}>
        {edit.create ? t("admin.addProduct") : t("admin.editProduct")}
      </Title>
      <Form<ProductFormValues>
        form={edit.form}
        layout="vertical"
        onFinish={edit.handleSubmit}
        style={{ maxWidth: 960 }}
        initialValues={edit.initialValues}
      >
        <ProductEditFormContent {...edit} />
      </Form>
    </>
  );
};

export default AdminProductEditPage;
