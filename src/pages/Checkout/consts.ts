import type { CheckoutFormValues } from "./types";

export const STORE_OPTIONS = [
  {
    value: "store1",
    labelKey: "checkout.store.store1",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Store1",
  },
  {
    value: "store2",
    labelKey: "checkout.store.store2",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Store2",
  },
  {
    value: "store3",
    labelKey: "checkout.store.store3",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Store3",
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
  "deliveryMethod" | "packaging" | "country"
> = {
  deliveryMethod: "shipping",
  packaging: [],
  country: COUNTRY_OPTIONS[0].value,
};
