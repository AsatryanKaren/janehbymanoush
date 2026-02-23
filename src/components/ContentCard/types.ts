import type { ReactNode } from "react";

export type ContentCardVariant = "vertical" | "horizontal";

type ContentCardBaseProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

export type ContentCardVerticalProps = ContentCardBaseProps & {
  variant: "vertical";
  description: string;
};

export type ContentCardHorizontalProps = ContentCardBaseProps & {
  variant: "horizontal";
  detail: string;
};

export type ContentCardProps =
  | ContentCardVerticalProps
  | ContentCardHorizontalProps;
