import { useEffect, useState, useCallback } from "react";
import {
  Table,
  Typography,
  Flex,
  App,
  Input,
  Button,
  DatePicker,
} from "antd";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminLogsApi } from "src/api/adminLogs";
import type { LogListItem, PagedLogsResponse, AdminLogsListParams } from "src/types/log";
import type { ColumnsType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const AdminLogsPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { message } = App.useApp();
  const [data, setData] = useState<PagedLogsResponse>({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState("");
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [search, setSearch] = useState("");

  const fetchLogs = useCallback(
    (pageNum: number, pageSizeNum: number, filters?: Partial<AdminLogsListParams>) => {
      setLoading(true);
      const params: AdminLogsListParams = {
        Page: String(pageNum),
        PageSize: String(pageSizeNum),
        ...(filters?.Level && { Level: filters.Level }),
        ...(filters?.DateFrom && { DateFrom: filters.DateFrom }),
        ...(filters?.DateTo && { DateTo: filters.DateTo }),
        ...(filters?.Search && { Search: filters.Search }),
      };
      adminLogsApi
        .getAll(params)
        .then((res) =>
          setData({
            items: res.items ?? [],
            page: res.page,
            pageSize: res.pageSize,
            total: res.total,
          }),
        )
        .catch(() => {
          setData({ items: [], page: 1, pageSize: 10, total: 0 });
          void message.error(t("admin.loadListFailed"));
        })
        .finally(() => setLoading(false));
    },
    [message, t],
  );

  useEffect(() => {
    fetchLogs(1, data.pageSize, {
      Level: level || undefined,
      DateFrom: dateFrom ? dateFrom.format("YYYY-MM-DD") : undefined,
      DateTo: dateTo ? dateTo.format("YYYY-MM-DD") : undefined,
      Search: search || undefined,
    });
  }, []);

  const handleApplyFilters = () => {
    fetchLogs(1, data.pageSize, {
      Level: level || undefined,
      DateFrom: dateFrom ? dateFrom.format("YYYY-MM-DD") : undefined,
      DateTo: dateTo ? dateTo.format("YYYY-MM-DD") : undefined,
      Search: search || undefined,
    });
  };

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    const nextPage = pagination.current ?? 1;
    const nextSize = pagination.pageSize ?? data.pageSize;
    fetchLogs(nextPage, nextSize, {
      Level: level || undefined,
      DateFrom: dateFrom ? dateFrom.format("YYYY-MM-DD") : undefined,
      DateTo: dateTo ? dateTo.format("YYYY-MM-DD") : undefined,
      Search: search || undefined,
    });
  };

  const columns: ColumnsType<LogListItem> = [
    {
      title: t("admin.logs.columnLevel"),
      dataIndex: "level",
      key: "level",
      width: 100,
      render: (v: string | null) => v ?? "—",
    },
    {
      title: t("admin.logs.columnMessage"),
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (msg: string | null) => {
        if (msg == null || msg === "") return "—";
        return (
          <Text ellipsis={{ tooltip: msg }} className={styles.ellipsisCell}>
            {msg}
          </Text>
        );
      },
    },
    {
      title: t("admin.logs.columnDate"),
      dataIndex: "raiseDate",
      key: "raiseDate",
      width: 165,
      render: (date: string) =>
        date
          ? new Date(date).toLocaleString(language, {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "—",
    },
    {
      title: t("admin.logs.columnException"),
      dataIndex: "exception",
      key: "exception",
      ellipsis: true,
      render: (v: string | null) => {
        if (v == null || v === "") return "—";
        return (
          <Text ellipsis={{ tooltip: v }} className={styles.ellipsisCell}>
            {v}
          </Text>
        );
      },
    },
    {
      title: t("admin.logs.columnMachine"),
      dataIndex: "machineName",
      key: "machineName",
      width: 140,
      render: (v: string | null) => v ?? "—",
    },
  ];

  return (
    <>
      <Title level={2}>{t("admin.logs.title")}</Title>
      <Flex vertical gap="middle">
        <Flex wrap="wrap" gap="small" align="center">
          <Input
            placeholder={t("admin.logs.filterLevel")}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{ width: 120 }}
            allowClear
          />
          <DatePicker
            placeholder={t("admin.logs.filterDateFrom")}
            value={dateFrom}
            onChange={(d) => setDateFrom(d)}
            allowClear
          />
          <DatePicker
            placeholder={t("admin.logs.filterDateTo")}
            value={dateTo}
            onChange={(d) => setDateTo(d)}
            allowClear
          />
          <Input
            placeholder={t("admin.logs.filterSearch")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
          <Button type="primary" onClick={handleApplyFilters}>
            {t("admin.logs.applyFilters")}
          </Button>
        </Flex>
        <Table<LogListItem>
          className={styles.logsTable}
          dataSource={data.items ?? []}
          columns={columns}
          rowKey={(r) => String(r.id ?? r.raiseDate ?? Math.random())}
          loading={loading}
          pagination={{
            current: data.page,
            pageSize: data.pageSize,
            total: data.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (totalCount) =>
              t("admin.paginationTotal", { total: totalCount }),
          }}
          onChange={handleTableChange}
          locale={{ emptyText: t("admin.logs.noLogs") }}
        />
      </Flex>
    </>
  );
};

export default AdminLogsPage;
