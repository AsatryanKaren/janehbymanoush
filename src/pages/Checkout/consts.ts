import { staticUrl } from "src/consts/gallery";
import { DEFAULT_CHECKOUT_PACKAGING, type PackagingEnum } from "src/types/packaging";
import type { CheckoutFormValues } from "./types";

type PackagingOptionRow = {
  value: PackagingEnum;
  imageUrl: string;
  priceAmd: number;
};

/** Single pickup location for now; more stores can be added later. */
export const STORE_OPTIONS = [
  {
    value: "rioMall",
    labelKey: "checkout.store.rioMall",
    hoursLabelKey: "checkout.store.rioMallHours",
    imageUrl: "https://placehold.co/80x80/292524/8d734a?text=Rio+Mall",
  },
] as const;

export const PACKAGING_OPTIONS: readonly PackagingOptionRow[] = [
  {
    value: "white_bag",
    imageUrl: staticUrl("Bag.webp"),
    priceAmd: 0,
  },
  {
    value: "black_bag",
    imageUrl: staticUrl("Bag 2.webp"),
    priceAmd: 0,
  },
  {
    value: "white_box",
    imageUrl: staticUrl("Box.webp"),
    priceAmd: 1200,
  },
  {
    value: "white_box_janeh",
    imageUrl: staticUrl("Box 2.webp"),
    priceAmd: 1200,
  },
  {
    value: "black_box",
    imageUrl: staticUrl("Box 3.webp"),
    priceAmd: 1200,
  },
];

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
  packaging: DEFAULT_CHECKOUT_PACKAGING,
  country: COUNTRY_OPTIONS[0].value,
};
