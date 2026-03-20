export type DeliveryMethod = "shipping" | "pickup";

export type CheckoutFormValues = {
  deliveryMethod: DeliveryMethod;
  name: string;
  email: string;
  address: string;
  phone: string;
  message?: string;
  packaging: string[];
  country: string;
  pickupStore?: string;
};
