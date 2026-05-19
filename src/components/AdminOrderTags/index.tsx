import { Flex, Tag } from "antd";
import type { AdminOrderStatus } from "src/types/order";
import type { PaymentType } from "src/types/payments";

const formatEnumLabel = (value: string): string => {
  const spaced = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const PAYMENT_TAG_COLOR: Record<PaymentType, string> = {
  online: "blue",
  onPickup: "orange",
};

const STATUS_TAG_COLOR: Record<AdminOrderStatus, string> = {
  declined: "error",
  processed: "processing",
  completed: "success",
  cancelled: "default",
  awaitingPayment: "geekblue",
  paid: "success",
  refunded: "purple",
  partiallyRefunded: "volcano",
};

const tagColor = (
  map: Record<string, string>,
  value: string | null | undefined,
): string => (value && map[value] ? map[value] : "default");

type TagCellProps = {
  onClick?: (e: React.MouseEvent) => void;
};

export const AdminOrderPaymentTag: React.FC<
  TagCellProps & { paymentType?: PaymentType | string | null }
> = ({ paymentType, onClick }) => {
  if (!paymentType) return <>—</>;
  return (
    <Tag color={tagColor(PAYMENT_TAG_COLOR, paymentType)} onClick={onClick}>
      {formatEnumLabel(paymentType)}
    </Tag>
  );
};

export const AdminOrderStatusTag: React.FC<
  TagCellProps & { status?: AdminOrderStatus | string | null }
> = ({ status, onClick }) => {
  if (!status) return <>—</>;
  return (
    <Tag color={tagColor(STATUS_TAG_COLOR, status)} onClick={onClick}>
      {formatEnumLabel(status)}
    </Tag>
  );
};

type AdminOrderTagsProps = {
  paymentType?: PaymentType | string | null;
  status?: AdminOrderStatus | string | null;
  size?: "default" | "compact";
};

export const AdminOrderTags: React.FC<AdminOrderTagsProps> = ({
  paymentType,
  status,
  size = "default",
}) => {
  const gap = size === "compact" ? 4 : "small";
  const stopRowClick = (e: React.MouseEvent): void => e.stopPropagation();

  return (
    <Flex gap={gap} wrap="wrap">
      {paymentType ?
        <AdminOrderPaymentTag paymentType={paymentType} onClick={stopRowClick} />
      : null}
      {status ?
        <AdminOrderStatusTag status={status} onClick={stopRowClick} />
      : null}
    </Flex>
  );
};
