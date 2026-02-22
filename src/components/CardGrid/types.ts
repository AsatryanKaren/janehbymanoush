import type { ReactNode } from "react";

export type CardGridPreset = "product" | "content3" | "content2";

export interface CardGridProps {
  children: ReactNode;
  preset?: CardGridPreset;
  gutter?: [number, number];
}
