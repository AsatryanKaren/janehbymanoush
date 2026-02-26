import { Button, Form, Input, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { OrderFormValues, OrderModalProps } from "./types";
import styles from "./styles.module.css";

const OrderModal: React.FC<OrderModalProps> = ({
  open,
  onClose,
  productName,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<OrderFormValues>();

  const handleFinish = (values: OrderFormValues) => {
    onSuccess?.(values);
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      closable
      destroyOnHidden
      title={null}
      width={480}
      centered
      className={styles.modal}
      classNames={{ body: styles.body }}
      styles={{ body: { paddingTop: 0 } }}
    >
      <div className={styles.header}>
        <Typography.Title level={2} className={styles.title}>
          {productName}
        </Typography.Title>
        <Typography.Text type="secondary" className={styles.subtitle}>
          {t("product.orderModal.subtitle")}
        </Typography.Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
        size="middle"
        className={styles.form}
      >
        <Form.Item
          name="firstName"
          label={t("product.orderModal.firstName")}
          rules={[
            { required: true, message: t("product.orderModal.firstNameRequired") },
          ]}
        >
          <Input placeholder={t("product.orderModal.firstNamePlaceholder")} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={t("product.orderModal.lastName")}
          rules={[
            { required: true, message: t("product.orderModal.lastNameRequired") },
          ]}
        >
          <Input placeholder={t("product.orderModal.lastNamePlaceholder")} />
        </Form.Item>

        <Form.Item
          name="email"
          label={t("product.orderModal.email")}
          rules={[
            { required: true, message: t("product.orderModal.emailRequired") },
            { type: "email", message: t("product.orderModal.emailInvalid") },
          ]}
        >
          <Input placeholder={t("product.orderModal.emailPlaceholder")} />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("product.orderModal.phone")}
          rules={[
            { required: true, message: t("product.orderModal.phoneRequired") },
          ]}
        >
          <Input placeholder={t("product.orderModal.phonePlaceholder")} />
        </Form.Item>

        <Form.Item name="message" label={t("product.orderModal.message")}>
          <Input.TextArea
            placeholder={t("product.orderModal.messagePlaceholder")}
            rows={3}
          />
        </Form.Item>

        <Form.Item className={styles.submitItem}>
          <Button
            type="primary"
            htmlType="submit"
            block
            className={styles.submitButton}
          >
            {t("product.orderModal.submit")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderModal;
