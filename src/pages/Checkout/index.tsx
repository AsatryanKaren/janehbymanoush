import { useState } from "react";
import { App, Col, Form, Row, Typography } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "src/app/providers/CartProvider";
import { ordersApi } from "src/api/orders";
import { ROUTES } from "src/consts/routes";
import { CHECKOUT_INITIAL_VALUES } from "./consts";
import type { CheckoutFormValues } from "./types";
import {
  buildCheckoutCreateOrderRequest,
  hasRingsWithoutSize,
} from "./utils";
import CheckoutFormSection from "./components/CheckoutFormSection";
import OrderSummary from "./components/OrderSummary";
import CheckoutInfoTabs from "./components/CheckoutInfoTabs";
import styles from "./styles.module.css";

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { items, removeItem, updateRingSize } = useCart();
  const [form] = Form.useForm<CheckoutFormValues>();
  const deliveryMethod = Form.useWatch("deliveryMethod", form) ?? "shipping";
  const [submitting, setSubmitting] = useState(false);

  const totalAmount = items.reduce(
    (sum, i) => sum + (i.price ?? 0) * i.quantity,
    0,
  );

  const handleFinish = (values: CheckoutFormValues) => {
    if (hasRingsWithoutSize(items)) {
      void message.error(t("checkout.ringSizeRequired"));
      return;
    }

    const isPickup = values.deliveryMethod === "pickup";
    if (isPickup && !values.pickupStore?.trim()) {
      void message.error(t("checkout.pickupStoreRequired"));
      return;
    }
    if (!isPickup && !values.address?.trim()) {
      void message.error(t("checkout.addressRequired"));
      return;
    }

    setSubmitting(true);

    const body = buildCheckoutCreateOrderRequest(items, values, t);

    ordersApi
      .create(body)
      .then(() => {
        void message.success(t("checkout.success"));
        items.forEach((item) => removeItem(item.id));
        form.resetFields();
        navigate(ROUTES.HOME);
      })
      .catch(() => {
        void message.error(t("checkout.error"));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (items.length === 0) {
    return <Navigate to={ROUTES.CATALOG} replace />;
  }

  return (
    <div className={styles.container}>
      <Typography.Title level={2} className={styles.title}>
        {t("checkout.title")}
      </Typography.Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={CHECKOUT_INITIAL_VALUES}
      >
        <Row gutter={[32, 32]} className={styles.row}>
          <Col xs={24} lg={14} className={styles.formCol}>
            <CheckoutFormSection
              form={form}
              deliveryMethod={deliveryMethod}
              submitting={submitting}
            />
          </Col>

          <Col xs={24} lg={10} className={styles.summaryCol}>
            <div className={styles.summaryStickyWrap}>
              <OrderSummary
                items={items}
                totalAmount={totalAmount}
                onUpdateRingSize={updateRingSize}
              />
            </div>
          </Col>
        </Row>

        <div className={styles.checkoutInfoTabsWrap}>
          <CheckoutInfoTabs />
        </div>
      </Form>
    </div>
  );
};

export default CheckoutPage;
