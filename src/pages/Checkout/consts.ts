import type { CheckoutFormValues } from "./types";

/** Single pickup location for now; more stores can be added later. */
export const STORE_OPTIONS = [
  {
    value: "rioMall",
    labelKey: "checkout.store.rioMall",
    hoursLabelKey: "checkout.store.rioMallHours",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Rio+Mall",
  },
] as const;

export const PACKAGING_OPTIONS = [
  {
    value: "bag",
    labelKey: "checkout.packaging.bag",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Bag",
  },
  {
    value: "box",
    labelKey: "checkout.packaging.box",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Box",
  },
  {
    value: "jewelryBox",
    labelKey: "checkout.packaging.jewelryBox",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Jewelry",
  },
] as const;

export const COUNTRY_OPTIONS = [
  { value: "armenia", labelKey: "checkout.countryArmenia" },
  { value: "russia", labelKey: "checkout.countryRussia" },
  { value: "usa", labelKey: "checkout.countryUSA" },
] as const;

export const CHECKOUT_INITIAL_VALUES: Pick<
  CheckoutFormValues,
  "deliveryMethod" | "paymentTiming" | "packaging" | "country"
> = {
  deliveryMethod: "shipping",
  paymentTiming: "online",
  packaging: [],
  country: COUNTRY_OPTIONS[0].value,
};
