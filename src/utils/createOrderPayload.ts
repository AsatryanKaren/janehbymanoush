import {
  type CreateOrderLineItem,
  type CreateOrderRequest,
  PackagingOptionFlag,
  ShippingCountry,
  StoreAddress,
} from "src/types/order";

/** Checkout form `packaging` values → backend flag bits. */
const PACKAGING_BY_FORM_VALUE: Record<string, number> = {
  bag: PackagingOptionFlag.Bag,
  box: PackagingOptionFlag.Box,
  jewelryBox: PackagingOptionFlag.SmallJewelryBox,
};

export const packagingFormValuesToFlags = (selected: string[]): number =>
  selected.reduce((acc, key) => acc | (PACKAGING_BY_FORM_VALUE[key] ?? 0), 0);

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
    packaging: PackagingOptionFlag.None,
    shippingCountry: ShippingCountry.Armenia,
  };
  return body;
};
