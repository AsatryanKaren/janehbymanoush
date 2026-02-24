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
  productName: string;
  onSuccess?: (values: OrderFormValues) => void;
};
