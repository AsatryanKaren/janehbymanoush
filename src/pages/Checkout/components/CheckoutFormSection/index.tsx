import { Button, Col, Form, Input, Row, Segmented } from "antd";
import { useTranslation } from "react-i18next";
import { PACKAGING_OPTIONS, STORE_OPTIONS } from "../../consts";
import { DELIVERY_METHOD_OPTIONS } from "./consts";
import type { CheckoutFormSectionProps } from "./types";
import CountryChipGroup from "../CountryChipGroup";
import SelectionCardGroup from "../SelectionCardGroup";
import styles from "../../styles.module.css";

const CheckoutFormSection: React.FC<CheckoutFormSectionProps> = ({
  form,
  deliveryMethod,
  submitting,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.paymentDraft}>{t("checkout.paymentDraft")}</div>

      <Form.Item
        name="deliveryMethod"
        label={t("checkout.deliveryMethod")}
        className={styles.deliveryMethodItem}
      >
        <Segmented
          options={DELIVERY_METHOD_OPTIONS.map((option) => ({
            value: option.value,
            label: t(option.labelKey),
          }))}
          block
          className={styles.deliverySegmented}
        />
      </Form.Item>

      {deliveryMethod === "shipping" && (
        <Form.Item
          name="country"
          label={t("checkout.countryLabelShipping")}
          rules={[{ required: true }]}
        >
          <CountryChipGroup />
        </Form.Item>
      )}

      {deliveryMethod === "pickup" && (
        <Form.Item name="pickupStore" label={t("checkout.pickupStoreLabel")}>
          <SelectionCardGroup
            options={STORE_OPTIONS}
            value={form.getFieldValue("pickupStore")}
            onChange={(value) => {
              if (typeof value === "string") {
                form.setFieldValue("pickupStore", value);
              }
            }}
          />
        </Form.Item>
      )}

      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label={t("checkout.name")}
            rules={[{ required: true, message: t("checkout.nameRequired") }]}
          >
            <Input placeholder={t("checkout.namePlaceholder")} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label={t("checkout.email")}
            rules={[
              { required: true, message: t("checkout.emailRequired") },
              { type: "email", message: t("checkout.emailInvalid") },
            ]}
          >
            <Input placeholder={t("checkout.emailPlaceholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 24]}>
        {deliveryMethod === "shipping" && (
          <Col xs={24} md={12}>
            <Form.Item
              name="address"
              label={t("checkout.address")}
              rules={[{ required: true, message: t("checkout.addressRequired") }]}
            >
              <Input placeholder={t("checkout.addressPlaceholder")} />
            </Form.Item>
          </Col>
        )}
        <Col xs={24} md={deliveryMethod === "shipping" ? 12 : 24}>
          <Form.Item
            name="phone"
            label={t("checkout.phone")}
            rules={[{ required: true, message: t("checkout.phoneRequired") }]}
          >
            <Input placeholder={t("checkout.phonePlaceholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="message" label={t("checkout.message")}>
        <Input.TextArea
          placeholder={t("checkout.messagePlaceholder")}
          rows={3}
        />
      </Form.Item>

      <Form.Item name="packaging" label={t("checkout.packagingLabel")}>
        <SelectionCardGroup
          options={PACKAGING_OPTIONS}
          value={form.getFieldValue("packaging")}
          multiple
          onChange={(value) => {
            if (Array.isArray(value)) {
              form.setFieldValue("packaging", value);
            }
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          block
          className={styles.submitBtn}
        >
          {t("checkout.submit")}
        </Button>
      </Form.Item>
    </>
  );
};

export default CheckoutFormSection;
