import { http } from "src/api/http";
import type { Order, OrderListParams, OrderListResponse } from "src/types/order";

export const ordersApi = {
  getAll: (params?: OrderListParams): Promise<OrderListResponse> =>
    http<OrderListResponse>("/orders", {
      params: {
        status: params?.status,
        page: params?.page,
        limit: params?.limit,
      },
    }),

  getById: (id: string): Promise<Order> =>
    http<Order>(`/orders/${id}`),

  updateStatus: (id: string, status: string): Promise<Order> =>
    http<Order>(`/orders/${id}/status`, { method: "PATCH", body: { status } }),
};
