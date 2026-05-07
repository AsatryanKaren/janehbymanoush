import type { ReactNode } from "react";

export type OutcomeVariant =
  | "success"
  | "failed"
  | "cancelled"
  | "pending"
  | "noPayment";

export type OutcomeBlockProps = {
  variant: OutcomeVariant;
  icon: ReactNode;
  title: string;
  subtitle: string;
  actions: ReactNode;
};
