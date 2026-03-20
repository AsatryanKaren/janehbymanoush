import { useTranslation } from "react-i18next";
import styles from "../../styles.module.css";

type SelectionOption = {
  value: string;
  labelKey: string;
  imageUrl: string;
};

type SelectionCardGroupProps = {
  options: readonly SelectionOption[];
  value?: string | string[];
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
};

const SelectionCardGroup: React.FC<SelectionCardGroupProps> = ({
  options,
  value,
  multiple = false,
  onChange,
}) => {
  const { t } = useTranslation();
  const selected = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];

  const toggle = (optValue: string) => {
    if (!multiple) {
      onChange?.(optValue);
      return;
    }

    const next = selected.includes(optValue)
      ? selected.filter((v) => v !== optValue)
      : [...selected, optValue];
    onChange?.(next);
  };

  return (
    <div className={styles.packagingOptions}>
      {options.map((opt) => {
        const isActive = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            className={
              isActive
                ? `${styles.packagingOption} ${styles.packagingOptionActive}`
                : styles.packagingOption
            }
            onClick={() => toggle(opt.value)}
          >
            <div className={styles.packagingOptionImageWrap}>
              <img
                src={opt.imageUrl}
                alt=""
                className={styles.packagingOptionImage}
              />
              {isActive && (
                <span className={styles.packagingOptionCheck} aria-hidden>
                  ✓
                </span>
              )}
            </div>
            <span className={styles.packagingOptionLabel}>{t(opt.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SelectionCardGroup;
