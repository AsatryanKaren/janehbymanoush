import type { ComponentType } from "react";
import {
  ToolOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import {
  CF_VALUES_EXPRESSION,
  CF_VALUES_QUALITY,
  CF_VALUES_SUSTAINABILITY,
} from "src/consts/gallery";

export const VALUES_KEYS = ["quality", "sustainability", "expression"] as const;
export type ValueKey = (typeof VALUES_KEYS)[number];

export const VALUES_IMAGE_MAP: Record<ValueKey, string> = {
  quality: CF_VALUES_QUALITY,
  sustainability: CF_VALUES_SUSTAINABILITY,
  expression: CF_VALUES_EXPRESSION,
};

export const VALUE_ICONS: Record<ValueKey, ComponentType<{ className?: string }>> = {
  quality: ToolOutlined,
  sustainability: EnvironmentOutlined,
  expression: BankOutlined,
};
