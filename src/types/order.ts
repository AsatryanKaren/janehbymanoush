/** Admin GET /v1/admin/orders: single order in list */
export interface OrderProductInfo {
  id: string;
  name?: string | null;
  slug?: string | null;
  mainImageUrl?: string | null;
}

export interface OrderListItem {
  id: string;
  product?: OrderProductInfo | null;
  customerName?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  createdAt?: string;
}

export interface PagedOrdersResponse {
  items: OrderListItem[] | null;
  page: number;
  pageSize: number;
  total: number;
}

/** Admin GET /v1/admin/orders query params */
export interface AdminOrdersListParams {
  Search?: string;
  ProductId?: string;
  DateFrom?: string;
  DateTo?: string;
  Page?: string;
  PageSize?: string;
}

/** Public order (e.g. for future use) */
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderListParams {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export interface OrderListResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}
