import { http } from "src/api/http";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
  OrderListParams,
  OrderListResponse,
} from "src/types/order";
import { toQueryParams } from "src/utils/queryParams";

const ORDERS_PATH = "/v1/orders";

export const ordersApi = {
  /** POST /v1/orders — create order (product page modal) */
  create: (body: CreateOrderRequest): Promise<CreateOrderResponse> =>
    http<CreateOrderResponse>(ORDERS_PATH, { method: "POST", body }),

  getAll: (params?: OrderListParams): Promise<OrderListResponse> =>
    http<OrderListResponse>(ORDERS_PATH, {
      params: toQueryParams(params),
    }),

  getById: (id: string): Promise<Order> =>
    http<Order>(`${ORDERS_PATH}/${id}`),

  updateStatus: (id: string, status: string): Promise<Order> =>
    http<Order>(`${ORDERS_PATH}/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};
