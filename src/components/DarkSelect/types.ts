import type { SelectProps } from "antd";

export type DarkSelectProps<ValueType = unknown> = SelectProps<ValueType> & {
  /** Optional className for the wrapper div */
  wrapperClassName?: string;
};
