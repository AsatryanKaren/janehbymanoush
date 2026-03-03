import { http } from "src/api/http";
import type {
  PagedLogsResponse,
  AdminLogsListParams,
} from "src/types/log";
import { toQueryParams } from "src/utils/queryParams";

const ADMIN_LOGS_PATH = "/v1/admin/logs";

export const adminLogsApi = {
  getAll: (params?: AdminLogsListParams): Promise<PagedLogsResponse> =>
    http<PagedLogsResponse>(ADMIN_LOGS_PATH, {
      params: toQueryParams(params),
    }),
};
