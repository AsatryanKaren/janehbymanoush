import type { CardGridPreset } from "./types";

export const PRESET_COLS: Record<
  CardGridPreset,
  { xs: number; sm: number; md: number; lg?: number }
> = {
  product: { xs: 24, sm: 12, md: 8, lg: 6 },
  content3: { xs: 24, sm: 12, md: 8 },
  content2: { xs: 24, sm: 12, md: 12 },
};
