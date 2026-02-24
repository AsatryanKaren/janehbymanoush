import type { ComponentType } from "react";
import {
  ToolOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";

export const VALUES_KEYS = ["quality", "sustainability", "expression"] as const;
export type ValueKey = (typeof VALUES_KEYS)[number];

export const VALUE_ICONS: Record<ValueKey, ComponentType<{ className?: string }>> = {
  quality: ToolOutlined,
  sustainability: EnvironmentOutlined,
  expression: BankOutlined,
};
