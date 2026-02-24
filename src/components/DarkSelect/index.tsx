import type React from "react";
import { Select } from "antd";
import type { DarkSelectProps } from "./types";
import styles from "./styles.module.css";

const DROPDOWN_CLASS = "catalog-sort-dropdown";

function DarkSelectInner<ValueType>(props: DarkSelectProps<ValueType>) {
  const { wrapperClassName, classNames, ...rest } = props;
  const mergedClassNames = {
    ...classNames,
    popup: { ...classNames?.popup, root: DROPDOWN_CLASS },
  };

  return (
    <div
      className={wrapperClassName ? `${styles.wrap} ${wrapperClassName}` : styles.wrap}
      data-themed-select
    >
      <Select<ValueType>
        {...rest}
        classNames={mergedClassNames}
      />
    </div>
  );
}

const DarkSelect = DarkSelectInner as <ValueType = unknown>(
  props: DarkSelectProps<ValueType>,
) => React.ReactElement;

export default DarkSelect;
export type { DarkSelectProps };
