import type { PaymentTiming } from "../../types";

export type PaymentTimingCardsProps = {
  value?: PaymentTiming;
  onChange?: (value: PaymentTiming) => void;
};
