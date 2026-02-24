import { ROUTES } from "src/consts/routes";

/** Category cards for Our Collections section (Figma node 41-18). Image optional – use empty string for placeholder. */
export const COLLECTION_CARDS = [
  {
    key: "rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    linkTo: ROUTES.CATALOG,
  },
  {
    key: "necklaces",
    image: "",
    linkTo: ROUTES.CATALOG,
  },
  {
    key: "bracelets",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    linkTo: ROUTES.CATALOG,
  },
  {
    key: "earrings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    linkTo: ROUTES.CATALOG,
  },
] as const;
