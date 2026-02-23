import type { ReactNode } from "react";

export type CardGridPreset = "product" | "catalog" | "content3" | "content2";

export type CardGridProps = {
  children: ReactNode;
  preset?: CardGridPreset;
  gutter?: [number, number];
};
