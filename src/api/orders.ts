import { http } from "src/api/http";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "src/types/order";

const ORDERS_PATH = "/v1/orders";

export const ordersApi = {
  /** POST /v1/orders — create order (product page modal) */
  create: (body: CreateOrderRequest): Promise<CreateOrderResponse> =>
    http<CreateOrderResponse>(ORDERS_PATH, { method: "POST", body }),
};
