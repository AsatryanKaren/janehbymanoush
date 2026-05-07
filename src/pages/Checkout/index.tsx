import { useState } from "react";
import { App, Col, Form, Row, Typography } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "src/app/providers/CartProvider";
import { ordersApi } from "src/api/orders";
import { paymentsApi } from "src/api/payments.api";
import { ROUTES } from "src/consts/routes";
import { packagingFormValueToApi } from "src/utils/createOrderPayload";
import i18n from "src/i18n";
import { savePending } from "src/pages/PaymentStatus/sessionStore";
import { CHECKOUT_INITIAL_VALUES, PACKAGING_OPTIONS } from "./consts";
import type { CheckoutFormValues } from "./types";
import {
  buildCheckoutCreateOrderRequest,
  hasRingsWithoutSize,
} from "./utils";
import CheckoutFormSection from "./components/CheckoutFormSection";
import OrderSummary from "./components/OrderSummary";
import CheckoutInfoTabs from "./components/CheckoutInfoTabs";
import styles from "./styles.module.css";

type RegisterLanguage = "en" | "hy" | "ru";

const toRegisterLanguage = (lang: string): RegisterLanguage | undefined => {
  const head = lang.slice(0, 2).toLowerCase();
  if (head === "en" || head === "hy" || head === "ru") return head;
  return undefined;
};

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { items, removeItem, updateRingSize } = useCart();
  const [form] = Form.useForm<CheckoutFormValues>();
  const deliveryMethod = Form.useWatch("deliveryMethod", form) ?? "shipping";
  const packagingField = Form.useWatch("packaging", form);
  const [submitting, setSubmitting] = useState(false);

  const merchandiseTotal = items.reduce(
    (sum, i) => sum + (i.price ?? 0) * i.quantity,
    0,
  );

  const packagingResolved = packagingFormValueToApi(
    typeof packagingField === "string" ? packagingField : CHECKOUT_INITIAL_VALUES.packaging,
  );
  const packagingOption = PACKAGING_OPTIONS.find((o) => o.value === packagingResolved);
  const packagingLine = { feeAmd: packagingOption?.priceAmd ?? 0 };
  const grandTotal = merchandiseTotal + packagingLine.feeAmd;

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
    const isOnline = body.paymentType === "online";

    ordersApi
      .create(body)
      .then((order) => {
        if (!isOnline) {
          void message.success(t("checkout.success"));
          items.forEach((item) => removeItem(item.id));
          form.resetFields();
          navigate(ROUTES.HOME);
          return;
        }

        // Online: register EPG session and redirect to the bank's hosted page.
        // Cart is intentionally NOT cleared here so the user can retry if they
        // bail out before paying. It is cleared on confirmed success in
        // src/pages/PaymentStatus/index.tsx after polling deposits.
        return paymentsApi
          .register({
            orderId: order.orderId,
            language: toRegisterLanguage(i18n.language),
          })
          .then((registered) => {
            savePending({
              epgOrderId: registered.epgOrderId,
              orderId: order.orderId,
              paymentId: registered.paymentId,
            });
            window.location.href = registered.formUrl;
          })
          .catch(() => {
            void message.error(t("checkout.error"));
            setSubmitting(false);
          });
      })
      .catch(() => {
        void message.error(t("checkout.error"));
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
                merchandiseTotal={merchandiseTotal}
                grandTotal={grandTotal}
                packagingLine={packagingLine}
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
