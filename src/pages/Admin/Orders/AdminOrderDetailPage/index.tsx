import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Flex,
  Image,
  Result,
  Spin,
  Tag,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { isAxiosError } from "axios";
import { useAdminTranslation } from "src/pages/Admin/useAdminTranslation";
import { adminOrdersApi } from "src/api/adminOrders";
import { ROUTES, buildProductPath } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import {
  adminOrderHasPickupStore,
  adminOrderHasShippingCountry,
  formatAdminPackaging,
  formatAdminShippingCountry,
  formatAdminStoreAddress,
  formatAdminLineItemRingSizes,
  getAdminOrderFulfillmentType,
} from "src/utils/adminOrderDetailDisplay";
import { adminOrderMessageDisplay } from "src/utils/orderMessageDisplay";
import type { AdminOrderDetail, AdminOrderDetailLineItem } from "src/types/order";
import styles from "./styles.module.css";

const { Title, Text, Paragraph, Link } = Typography;

/** English-only copy for missing order / load error (not localized). */
const ORDER_DETAIL_NOT_FOUND_TITLE = "Order not found";
const ORDER_DETAIL_NOT_FOUND_DESCRIPTION =
  "No order matches this link. The ID may be wrong or the order was removed. Go back to the list and open the order again.";
const ORDER_DETAIL_LOAD_FAILED_TITLE = "Failed to load order";
const ORDER_DETAIL_LOAD_FAILED_DESCRIPTION =
  "We could not load this order. Check your connection and try again, or return to the order list.";

const dash = (v: string | null | undefined): string =>
  v != null && v !== "" ? v : "—";

const AdminOrderDetailPage: React.FC = () => {
  const { t, language } = useAdminTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<AdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<"notFound" | "error" | null>(null);

  useEffect(() => {
    const trimmedId = id?.trim();
    if (!trimmedId) {
      setOrder(null);
      setLoadError("notFound");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);
    adminOrdersApi
      .getById(trimmedId)
      .then((data) => {
        setOrder(data);
        setLoadError(null);
      })
      .catch((err: unknown) => {
        setOrder(null);
        if (isAxiosError(err) && err.response?.status === 404) {
          setLoadError("notFound");
        } else {
          setLoadError("error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" className={styles.loadingWrap}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!order) {
    const backButton = (
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(ROUTES.ADMIN_ORDERS)}
      >
        {t("admin.orderDetail.backToOrders")}
      </Button>
    );

    if (loadError === "notFound") {
      return (
        <Result
          status="404"
          title={ORDER_DETAIL_NOT_FOUND_TITLE}
          subTitle={ORDER_DETAIL_NOT_FOUND_DESCRIPTION}
          extra={backButton}
          className={styles.resultWrap}
        />
      );
    }

    return (
      <Result
        status="error"
        title={ORDER_DETAIL_LOAD_FAILED_TITLE}
        subTitle={ORDER_DETAIL_LOAD_FAILED_DESCRIPTION}
        extra={backButton}
        className={styles.resultWrap}
      />
    );
  }

  const orderCurrency = order.currency ?? "USD";
  const items = order.items ?? [];
  const createdLabel =
    order.createdAt ?
      new Date(order.createdAt).toLocaleString(language, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  const lineLabel = (row: AdminOrderDetailLineItem): string =>
    row.productName ?? row.product?.name ?? "—";

  const lineCurrency = (row: AdminOrderDetailLineItem): string =>
    row.currency ?? orderCurrency;

  const messageDisplay = adminOrderMessageDisplay(order.message);

  const fulfillment = getAdminOrderFulfillmentType(order);
  const summaryTitleExtra =
    fulfillment === "unknown" ? null : (
      <Tag
        className={
          fulfillment === "pickup" ? styles.tagPickup : styles.tagDelivery
        }
      >
        {fulfillment === "pickup" ?
          t("admin.orderDetail.tagPickup")
        : t("admin.orderDetail.tagDelivery")}
      </Tag>
    );

  return (
    <>
      <Flex
        align="center"
        gap="middle"
        wrap
        className={styles.header}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(ROUTES.ADMIN_ORDERS)}
        >
          {t("admin.orderDetail.backToOrders")}
        </Button>
        <Title level={2} className={styles.title}>
          {t("admin.orderDetail.title")}
        </Title>
      </Flex>

      <Flex vertical gap="large" className={styles.cardStack}>
        <Card
          title={t("admin.orderDetail.sectionSummary")}
          extra={summaryTitleExtra}
        >
          <Descriptions column={{ xs: 1, sm: 1, md: 2 }} bordered size="small">
            <Descriptions.Item label={t("admin.orderDetail.createdAt")}>
              {createdLabel}
            </Descriptions.Item>
            <Descriptions.Item label={t("admin.orderDetail.total")}>
              <Text strong>
                {formatPrice(order.totalAmount, orderCurrency, language)}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={t("admin.orderDetail.customerName")}>
              {dash(order.customerName)}
            </Descriptions.Item>
            <Descriptions.Item label={t("admin.orderDetail.phone")}>
              {order.phone ?
                <Text copyable={{ text: order.phone }}>{order.phone}</Text>
              : "—"}
            </Descriptions.Item>
            <Descriptions.Item label={t("admin.orderDetail.email")}>
              {order.email ?
                <Text copyable={{ text: order.email }}>{order.email}</Text>
              : "—"}
            </Descriptions.Item>
            {adminOrderHasShippingCountry(order.shippingCountry) ?
              <Descriptions.Item label={t("admin.orderDetail.shippingCountry")}>
                {formatAdminShippingCountry(order.shippingCountry, t)}
              </Descriptions.Item>
            : null}
            {adminOrderHasPickupStore(order.storeAddress) ?
              <Descriptions.Item label={t("admin.orderDetail.storeAddress")}>
                {formatAdminStoreAddress(order.storeAddress, t)}
              </Descriptions.Item>
            : null}
            <Descriptions.Item label={t("admin.orderDetail.packaging")}>
              {formatAdminPackaging(order.packaging, t)}
            </Descriptions.Item>
            <Descriptions.Item
              label={t("admin.orderDetail.message")}
              span={{ xs: 1, sm: 1, md: 2 }}
            >
              {messageDisplay === "—" ?
                "—"
              : <Paragraph className={styles.messageBlock}>
                  {messageDisplay}
                </Paragraph>}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={t("admin.orderDetail.sectionItems")}>
          {items.length === 0 ?
            <Text type="secondary">{t("admin.orderDetail.noItems")}</Text>
          : items.map((row) => {
              const img = row.product?.mainImageUrl;
              const qty = row.count ?? 0;
              const unit = row.unitPrice ?? 0;
              const c = lineCurrency(row);
              const subtotal = unit * qty;
              const productSlug = row.product?.slug?.trim();
              const lineRingSizesText = formatAdminLineItemRingSizes(
                row.ringSizes,
              );
              return (
                <Flex
                  key={row.id}
                  gap="middle"
                  align="flex-start"
                  className={styles.itemRow}
                >
                  {img ?
                    <Image
                      src={img}
                      alt=""
                      width={72}
                      height={72}
                      className={styles.itemImage}
                      preview={{ mask: t("admin.columnImage") }}
                    />
                  : (
                    <Flex
                      align="center"
                      justify="center"
                      className={`${styles.itemImage} ${styles.itemPlaceholder}`}
                    >
                      <Text type="secondary">—</Text>
                    </Flex>
                  )}
                  <Flex vertical gap="small" className={styles.itemMeta} flex={1}>
                    <Text strong ellipsis={{ tooltip: lineLabel(row) }}>
                      {lineLabel(row)}
                    </Text>
                    {productSlug ?
                      <Link
                        href={buildProductPath(productSlug)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("admin.orderDetail.viewProduct")}
                      </Link>
                    : <Text type="secondary">
                        {t("admin.orderDetail.productId")}: {row.productId}
                      </Text>}
                    {lineRingSizesText ?
                      <Text type="secondary">
                        {t("admin.orderDetail.lineItemRingSizes")}:{" "}
                        {lineRingSizesText}
                      </Text>
                    : null}
                    <Divider className={styles.itemDivider} />
                    <Flex wrap gap="large">
                      <Text>
                        {t("admin.orderDetail.unitPrice")}:{" "}
                        {formatPrice(unit, c, language)}
                      </Text>
                      <Text>
                        {t("admin.orderDetail.quantity")}: {qty}
                      </Text>
                      <Text strong>
                        {t("admin.orderDetail.lineTotal")}:{" "}
                        {formatPrice(subtotal, c, language)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })
          }
        </Card>
      </Flex>
    </>
  );
};

export default AdminOrderDetailPage;
