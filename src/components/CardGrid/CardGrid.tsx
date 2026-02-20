import { Col, Row } from "antd";
import type { ReactNode } from "react";
import React from "react";
import styles from "./CardGrid.module.css";

export type CardGridPreset = "product" | "content3" | "content2";

const PRESET_COLS: Record<
  CardGridPreset,
  { xs: number; sm: number; md: number; lg?: number }
> = {
  product: { xs: 24, sm: 12, md: 8, lg: 6 },
  content3: { xs: 24, sm: 12, md: 8 },
  content2: { xs: 24, sm: 12, md: 12 },
};

interface CardGridProps {
  children: ReactNode;
  preset?: CardGridPreset;
  gutter?: [number, number];
}

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
