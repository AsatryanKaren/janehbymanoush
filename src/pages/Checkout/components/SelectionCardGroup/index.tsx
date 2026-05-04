import { useTranslation } from "react-i18next";
import { formatPrice } from "src/utils/formatPrice";
import styles from "../../styles.module.css";

type SelectionOption = {
  value: string;
  /** When set, shown under the image (e.g. pickup store). Omit for image-only cards. */
  labelKey?: string;
  imageUrl: string;
  hoursLabelKey?: string;
  /** When set (including 0), shown under the image (e.g. packaging price). */
  priceAmd?: number;
};

type SelectionCardGroupProps = {
  options: readonly SelectionOption[];
  value?: string | string[];
  multiple?: boolean;
  /** When false, options are display-only (e.g. single fixed pickup store). */
  interactive?: boolean;
  /** Square tile: image fills the card; price is drawn on the image (not below). */
  imageFill?: boolean;
  /** When false, single-select cards cannot be cleared by tapping the active option again. */
  allowDeselect?: boolean;
  onChange?: (value: string | string[]) => void;
};

const SelectionCardGroup: React.FC<SelectionCardGroupProps> = ({
  options,
  value,
  multiple = false,
  interactive = true,
  imageFill = false,
  allowDeselect = true,
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
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
      if (selected.includes(optValue)) {
        if (!allowDeselect) {
          return;
        }
        onChange?.("");
        return;
      }
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
      {options.map((opt, index) => {
        const isActive = selected.includes(opt.value);
        const className = [
          styles.packagingOption,
          imageFill ? styles.packagingOptionImageFill : "",
          isActive ? styles.packagingOptionActive : "",
          !interactive ? styles.packagingOptionStatic : "",
        ]
          .filter(Boolean)
          .join(" ");
        const label = opt.labelKey != null && opt.labelKey.length > 0 ? t(opt.labelKey) : "";
        const priceAmd = opt.priceAmd;
        const priceLine =
          typeof priceAmd === "number"
            ? priceAmd > 0
              ? formatPrice(priceAmd, "AMD", lang)
              : t("common.free")
            : null;
        const hoursText = opt.hoursLabelKey ? t(opt.hoursLabelKey) : null;
        const ariaForControl =
          hoursText != null && hoursText.length > 0
            ? `${label}. ${hoursText}`
            : label.length > 0
              ? label
              : t("checkout.packagingOptionAria", {
                  current: index + 1,
                  total: options.length,
                });
        const inner = (
          <>
            <div className={styles.packagingOptionLead}>
              <div className={styles.packagingOptionImageWrap}>
                <img
                  src={opt.imageUrl}
                  alt=""
                  className={styles.packagingOptionImage}
                />
                {imageFill && priceLine != null ? (
                  <span className={styles.packagingOptionPriceOnImage}>{priceLine}</span>
                ) : null}
                {isActive && (
                  <span className={styles.packagingOptionCheck} aria-hidden>
                    ✓
                  </span>
                )}
              </div>
              {!imageFill && label.length > 0 ? (
                <span className={styles.packagingOptionLabel}>{label}</span>
              ) : null}
              {!imageFill && priceLine != null ? (
                <span className={styles.packagingOptionPrice}>{priceLine}</span>
              ) : null}
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
              aria-label={ariaForControl}
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
            aria-label={ariaForControl}
            aria-pressed={isActive}
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
