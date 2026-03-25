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
    i18nKey: "footer.help.ringSizeGuide",
    icon: ReadOutlined,
  },
  {
    path: ROUTES.CARE,
    i18nKey: "footer.help.careInstructions",
    icon: HeartOutlined,
  },
  {
    path: "/gift-cards",
    i18nKey: "footer.help.giftCards",
    icon: GiftOutlined,
  },
  {
    path: ROUTES.SHIPPING,
    i18nKey: "footer.about.shipping",
    icon: CarOutlined,
  },
] as const;
