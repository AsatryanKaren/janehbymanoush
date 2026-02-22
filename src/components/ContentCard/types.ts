import type { ReactNode } from "react";

export type ContentCardVariant = "vertical" | "horizontal";

interface ContentCardBaseProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

export interface ContentCardVerticalProps extends ContentCardBaseProps {
  variant: "vertical";
  description: string;
}

export interface ContentCardHorizontalProps extends ContentCardBaseProps {
  variant: "horizontal";
  detail: string;
}

export type ContentCardProps =
  | ContentCardVerticalProps
  | ContentCardHorizontalProps;
