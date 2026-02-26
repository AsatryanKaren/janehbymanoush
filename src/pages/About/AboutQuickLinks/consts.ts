import {
  CarOutlined,
  GiftOutlined,
  HeartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { ROUTES } from "src/consts/routes";

export const QUICK_LINKS = [
  {
    path: ROUTES.RING_SIZE_GUIDE,
    i18nKey: "footer.purchases.ringSizeGuide",
    icon: ReadOutlined,
  },
  {
    path: "/gift-cards",
    i18nKey: "footer.purchases.giftCards",
    icon: GiftOutlined,
  },
  {
    path: ROUTES.SHIPPING,
    i18nKey: "footer.purchases.shippingReturns",
    icon: CarOutlined,
  },
  {
    path: ROUTES.CARE,
    i18nKey: "footer.purchases.careInstructions",
    icon: HeartOutlined,
  },
] as const;
