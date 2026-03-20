import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { COUNTRY_OPTIONS } from "../../consts";
import styles from "../../styles.module.css";

type CountryChipGroupProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const CountryChipGroup: React.FC<CountryChipGroupProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.countryChips}>
      {COUNTRY_OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          type="default"
          htmlType="button"
          className={
            value === opt.value
              ? `${styles.countryChip} ${styles.countryChipActive}`
              : styles.countryChip
          }
          onClick={() => onChange?.(opt.value)}
        >
          {t(opt.labelKey)}
        </Button>
      ))}
    </div>
  );
};

export default CountryChipGroup;
