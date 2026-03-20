import type { FormInstance } from "antd/es/form";
import type { CheckoutFormValues, DeliveryMethod } from "../../types";

export type CheckoutFormSectionProps = {
  form: FormInstance<CheckoutFormValues>;
  deliveryMethod: DeliveryMethod;
  submitting: boolean;
};
