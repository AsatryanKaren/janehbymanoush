export interface RingSizeSelectorProps {
  /** Currently selected size (null when none selected). */
  value: number | null;
  /** Whether the selected value is from the custom size control. */
  isCustom: boolean;
  /** Called when selection or custom value changes. */
  onChange: (value: number | null, isCustom: boolean) => void;
  /** Show validation error state (e.g. after failed add to cart). */
  error?: boolean;
  disabled?: boolean;
}
