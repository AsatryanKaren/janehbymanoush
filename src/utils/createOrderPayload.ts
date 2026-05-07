import {
  type CreateOrderLineItem,
  type CreateOrderRequest,
  ShippingCountry,
  StoreAddress,
} from "src/types/order";
import { toCheckoutOrderPackagingApi } from "src/types/packaging";

export const packagingFormValueToApi = toCheckoutOrderPackagingApi;

export const pickupStoreValueToStoreAddress = (
  store: string | undefined,
): StoreAddress | undefined => {
  if (store === "rioMall") {
    return StoreAddress.RioMall;
  }
  return undefined;
};

export const checkoutCountryValueToShippingCountry = (
  country: string,
): ShippingCountry => {
  if (country === "russia") {
    return ShippingCountry.Russia;
  }
  if (country === "usa") {
    return ShippingCountry.Usa;
  }
  return ShippingCountry.Armenia;
};

/** Product-page quick order: defaults to shipping within Armenia, no packaging. */
export const buildProductModalCreateOrderRequest = (params: {
  productId: string;
  count: number;
  customerName: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  ringSize?: number | null;
}): CreateOrderRequest => {
  const line: CreateOrderLineItem = {
    productId: params.productId,
    count: params.count,
  };
  if (params.ringSize != null && typeof params.ringSize === "number") {
    line.ringSize = params.ringSize;
  }
  const body: CreateOrderRequest = {
    items: [line],
    customerName: params.customerName,
    phone: params.phone,
    email: params.email,
    message: params.message,
    packaging: toCheckoutOrderPackagingApi(null),
    shippingCountry: ShippingCountry.Armenia,
    // Quick-order modal does not run the EPG redirect flow; treat as pay-on-pickup
    // so the backend does not require a payment session.
    paymentType: "onPickup",
  };
  return body;
};
