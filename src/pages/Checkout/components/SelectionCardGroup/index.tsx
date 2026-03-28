import { useTranslation } from "react-i18next";
import styles from "../../styles.module.css";

type SelectionOption = {
  value: string;
  labelKey: string;
  imageUrl: string;
  hoursLabelKey?: string;
};

type SelectionCardGroupProps = {
  options: readonly SelectionOption[];
  value?: string | string[];
  multiple?: boolean;
  /** When false, options are display-only (e.g. single fixed pickup store). */
  interactive?: boolean;
  onChange?: (value: string | string[]) => void;
};

const SelectionCardGroup: React.FC<SelectionCardGroupProps> = ({
  options,
  value,
  multiple = false,
  interactive = true,
  onChange,
}) => {
  const { t } = useTranslation();
  const selected = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];

  const toggle = (optValue: string) => {
    if (!interactive) {
      return;
    }
    if (!multiple) {
      onChange?.(optValue);
      return;
    }

    const next = selected.includes(optValue)
      ? selected.filter((v) => v !== optValue)
      : [...selected, optValue];
    onChange?.(next);
  };

  const optionsClassName = [
    styles.packagingOptions,
    options.length === 1 ? styles.packagingOptionsSingle : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={optionsClassName}>
      {options.map((opt) => {
        const isActive = selected.includes(opt.value);
        const className = [
          styles.packagingOption,
          isActive ? styles.packagingOptionActive : "",
          !interactive ? styles.packagingOptionStatic : "",
        ]
          .filter(Boolean)
          .join(" ");
        const label = t(opt.labelKey);
        const hoursText = opt.hoursLabelKey ? t(opt.hoursLabelKey) : null;
        const statusLabel =
          hoursText != null && hoursText.length > 0
            ? `${label}. ${hoursText}`
            : label;
        const inner = (
          <>
            <div className={styles.packagingOptionLead}>
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
              <span className={styles.packagingOptionLabel}>{label}</span>
            </div>
            {hoursText != null && hoursText.length > 0 ? (
              <span className={styles.packagingOptionHours}>{hoursText}</span>
            ) : null}
          </>
        );
        if (!interactive) {
          return (
            <div
              key={opt.value}
              className={className}
              role="status"
              aria-label={statusLabel}
            >
              {inner}
            </div>
          );
        }
        return (
          <button
            key={opt.value}
            type="button"
            className={className}
            onClick={() => toggle(opt.value)}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
};

export default SelectionCardGroup;
