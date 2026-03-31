/** Backend `ShippingCountry` — values must match API contract. */
export enum ShippingCountry {
  Armenia = 0,
  Russia = 1,
  Usa = 2,
}

/** Backend `StoreAddress`. */
export enum StoreAddress {
  RioMall = 0,
}

/**
 * Backend `PackagingOption` flags (combine with bitwise OR).
 * None = 0, Bag = 1, Box = 2, SmallJewelryBox = 4
 */
export const PackagingOptionFlag = {
  None: 0,
  Bag: 1,
  Box: 2,
  SmallJewelryBox: 4,
} as const;

/** Single line in POST /v1/orders `items`. */
export type CreateOrderLineItem = {
  productId: string;
  count: number;
  /** Set for ring products when the customer chose a size. */
  ringSize?: number;
};

/**
 * POST /v1/orders — create order request.
 * Send `shippingCountry` for shipping; send `storeAddress` for pickup (omit the other).
 */
export type CreateOrderRequest = {
  items: CreateOrderLineItem[];
  customerName: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  packaging: number;
  /** Shipping only — omit when pickup. */
  shippingCountry?: number;
  /** Pickup only — omit when shipping. */
  storeAddress?: number;
  /**
   * Optional root-level size (e.g. legacy single-item orders). Prefer `items[].ringSize`
   * per line when the cart has multiple rings.
   */
  ringSize?: number;
};

/** POST /v1/orders — create order response */
export type CreateOrderResponse = {
  orderId: string;
};

/** Admin GET /v1/admin/orders: single order in list */
export type OrderProductInfo = {
  id: string;
  name?: string | null;
  slug?: string | null;
  mainImageUrl?: string | null;
  count?: number;
};

export type OrderListItem = {
  id: string;
  product?: OrderProductInfo | null;
  count?: number;
  customerName?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  createdAt?: string;
};

export type PagedOrdersResponse = {
  items: OrderListItem[] | null;
  page: number;
  pageSize: number;
  total: number;
};

/** Admin GET /v1/admin/orders query params */
export type AdminOrdersListParams = {
  Search?: string;
  ProductId?: string;
  DateFrom?: string;
  DateTo?: string;
  Page?: string;
  PageSize?: string;
};

/** Admin GET /v1/admin/orders/{id} — line item */
export type AdminOrderDetailLineProduct = {
  id: string;
  name?: string | null;
  slug?: string | null;
  mainImageUrl?: string | null;
  count?: number;
};

export type AdminOrderDetailLineItem = {
  id: string;
  productId: string;
  productName?: string | null;
  unitPrice: number;
  currency?: string | null;
  count: number;
  product?: AdminOrderDetailLineProduct | null;
  /**
   * Per-line ring sizes when API returns them (e.g. one entry per unit).
   * Optional until backend adds the field.
   */
  ringSizes?: number[] | number | null;
};

/** Admin GET /v1/admin/orders/{id} */
export type AdminOrderDetail = {
  id: string;
  customerName?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  createdAt?: string;
  ringSize?: number | null;
  /** API may return enum number or string (e.g. `"usa"`). */
  shippingCountry?: number | string | null;
  /** API may return enum number or string (e.g. `"rioMall"`). */
  storeAddress?: number | string | null;
  /** API may return flag bits (number) or comma-separated names (string). */
  packaging?: number | string | null;
  totalAmount: number;
  currency?: string | null;
  items?: AdminOrderDetailLineItem[] | null;
};

/** Public order (e.g. for future use) */
export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type OrderListParams = {
  status?: OrderStatus;
  page?: number;
  limit?: number;
};

export type OrderListResponse = {
  data: Order[];
  total: number;
  page: number;
  limit: number;
};

export enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}
