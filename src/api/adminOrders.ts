import { http } from "src/api/http";
import type {
  AdminOrderDetail,
  PagedOrdersResponse,
  AdminOrdersListParams,
} from "src/types/order";
import { toQueryParams } from "src/utils/queryParams";

const ADMIN_ORDERS_PATH = "/v1/admin/orders";

export const adminOrdersApi = {
  getAll: (params?: AdminOrdersListParams): Promise<PagedOrdersResponse> =>
    http<PagedOrdersResponse>(ADMIN_ORDERS_PATH, {
      params: toQueryParams(params),
    }),

  getById: (id: string): Promise<AdminOrderDetail> =>
    http<AdminOrderDetail>(`${ADMIN_ORDERS_PATH}/${id}`),
};
