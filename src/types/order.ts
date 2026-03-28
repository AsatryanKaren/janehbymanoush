/** POST /v1/orders — create order request */
export type CreateOrderRequest = {
  productId: string;
  count: number;
  customerName: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  /** Ring size when selected on product page (optional). */
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
  shippingCountry?: number | null;
  storeAddress?: number | null;
  packaging?: number | null;
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
