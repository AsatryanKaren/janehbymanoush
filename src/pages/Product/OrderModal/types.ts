export type OrderFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

export type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  /** Quantity selected on product page (+/-). Sent as count in order. */
  count: number;
  /** Ring size when selected on product page. Omitted from request if null. */
  ringSize?: number | null;
  onSuccess?: (values: OrderFormValues) => void;
};
