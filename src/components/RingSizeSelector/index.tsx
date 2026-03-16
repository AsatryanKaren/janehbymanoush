import { Button } from "antd";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  CUSTOM_DEFAULT,
  CUSTOM_MAX,
  CUSTOM_MIN,
  CUSTOM_STEP,
  PREDEFINED_SIZES,
} from "./consts";
import type { RingSizeSelectorProps } from "./types";
import styles from "./styles.module.css";

function formatSize(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

const RingSizeSelector: React.FC<RingSizeSelectorProps> = ({
  value,
  isCustom,
  onChange,
  error = false,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const handleChipClick = (size: number) => {
    if (isPredefinedSelected(size)) {
      onChange(null, false);
    } else {
      onChange(size, false);
    }
  };

  const handleCustomClick = () => {
    const next =
      value !== null && isCustom ? value : CUSTOM_DEFAULT;
    onChange(next, true);
  };

  const handleCustomDecrement = () => {
    const current = isCustom && value !== null ? value : CUSTOM_DEFAULT;
    const next = Math.max(CUSTOM_MIN, Math.round((current - CUSTOM_STEP) * 10) / 10);
    onChange(next, true);
  };

  const handleCustomIncrement = () => {
    const current = isCustom && value !== null ? value : CUSTOM_DEFAULT;
    const next = Math.min(CUSTOM_MAX, Math.round((current + CUSTOM_STEP) * 10) / 10);
    onChange(next, true);
  };

  const customValue =
    isCustom && value !== null ? value : CUSTOM_DEFAULT;
  const customAtMin = customValue <= CUSTOM_MIN;
  const customAtMax = customValue >= CUSTOM_MAX;

  const isPredefinedSelected = (size: number) =>
    !isCustom && value !== null && Math.abs(value - size) < 0.01;

  const handleDeselectCustom = () => {
    onChange(null, false);
  };

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ""}`}>
      <span className={styles.label} id="ring-size-label">
        {t("product.ringSizeLabel")}
      </span>
      <div className={styles.chipsWrap} role="group" aria-labelledby="ring-size-label">
        {PREDEFINED_SIZES.map((size) => (
          <Button
            key={size}
            type="default"
            size="middle"
            className={`${styles.chip} ${isPredefinedSelected(size) ? styles.chipActive : ""}`}
            onClick={() => handleChipClick(size)}
            disabled={disabled}
            aria-pressed={isPredefinedSelected(size)}
            aria-label={t("product.ringSizeChip", { size: formatSize(size) })}
          >
            {formatSize(size)}
          </Button>
        ))}
        {isCustom ? (
          <div className={styles.customControlsWrapper}>
            <div
              className={styles.customControls}
              role="group"
              aria-label={t("product.ringSizeCustomAdjust")}
            >
              <Button
                type="text"
                icon={<MinusOutlined />}
                onClick={handleCustomDecrement}
                disabled={disabled || customAtMin}
                className={styles.customBtn}
                aria-label={t("product.ringSizeDecrease")}
              />
              <span className={styles.customValue} aria-live="polite">
                {formatSize(customValue)}
              </span>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={handleCustomIncrement}
                disabled={disabled || customAtMax}
                className={styles.customBtn}
                aria-label={t("product.ringSizeIncrease")}
              />
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleDeselectCustom}
              disabled={disabled}
              className={styles.customClearBtn}
              aria-label={t("product.ringSizeClear")}
            />
          </div>
        ) : (
          <Button
            type="default"
            size="middle"
            className={`${styles.chip} ${styles.chipCustom}`}
            onClick={handleCustomClick}
            disabled={disabled}
            aria-pressed={false}
            aria-label={t("product.ringSizeCustom")}
          >
            {t("product.ringSizeCustom")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RingSizeSelector;
