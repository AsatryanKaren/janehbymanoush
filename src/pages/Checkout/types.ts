import type { PackagingEnum } from "src/types/packaging";

export type DeliveryMethod = "shipping" | "pickup";

/** Pay now vs pay when collecting the order — UI only until the API accepts it */
export type PaymentTiming = "online" | "on_pickup";

export type CheckoutFormValues = {
  deliveryMethod: DeliveryMethod;
  paymentTiming: PaymentTiming;
  name: string;
  email: string;
  address: string;
  phone: string;
  message?: string;
  /** Always one of the five packaging SKUs (defaults to first). */
  packaging: PackagingEnum;
  country: string;
  pickupStore?: string;
};
