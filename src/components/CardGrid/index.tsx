import { Col, Row } from "antd";
import React from "react";
import type { CardGridProps } from "./types";
import { PRESET_COLS } from "./consts";
import styles from "./styles.module.css";

const CardGrid: React.FC<CardGridProps> = ({
  children,
  preset = "product",
  gutter = [24, 24],
}) => {
  const childArray = React.Children.toArray(children);
  const colProps = PRESET_COLS[preset];

  return (
    <Row gutter={gutter} className={styles.row}>
      {childArray.map((child, index) => (
        <Col
          key={
            React.isValidElement(child) && child.key != null ? String(child.key) : index
          }
          xs={colProps.xs}
          sm={colProps.sm}
          md={colProps.md}
          {...(colProps.lg != null && { lg: colProps.lg })}
          className={styles.gridCol}
        >
          {child}
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
export type { CardGridPreset } from "./types";
