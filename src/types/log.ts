/** GET /v1/admin/logs — single log entry */
export type LogListItem = {
  id?: number;
  message?: string | null;
  level?: string | null;
  raiseDate?: string;
  exception?: string | null;
  machineName?: string | null;
};

/** GET /v1/admin/logs response */
export type PagedLogsResponse = {
  items: LogListItem[] | null;
  page: number;
  pageSize: number;
  total: number;
};

/** GET /v1/admin/logs query params */
export type AdminLogsListParams = {
  Level?: string;
  DateFrom?: string;
  DateTo?: string;
  Search?: string;
  Page?: string;
  PageSize?: string;
};
