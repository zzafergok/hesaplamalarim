export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface PresetOption {
  label: string;
  value: Date | DateRange | Date[];
}

export interface TimeZoneOption {
  value: string;
  label: string;
}

export interface DatePickerProps {
  // Value props
  value?: Date | Date[] | DateRange | null;
  onChange?: (date: Date | Date[] | DateRange | null) => void;

  // Mode configuration
  mode?: 'single' | 'multiple' | 'range';
  enableTime?: boolean;
  enableTimezone?: boolean;

  // Date constraints
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDaysOfWeek?: number[]; // 0-6 (Sunday-Saturday)

  // Display options
  placeholder?: string;
  dateFormat?: string;
  timeFormat?: string;
  locale?: 'tr' | 'en';
  showWeekNumbers?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  // UI configuration
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  /** Displays the clear/close action row below the calendar. */
  showFooter?: boolean;
  className?: string;

  // Advanced features
  enablePresets?: boolean;
  customPresets?: PresetOption[];

  // Events
  onFocus?: () => void;
  onBlur?: () => void;
  onMonthChange?: (month: Date) => void;
  onYearChange?: (year: number) => void;
}

import type { Locale } from '@/i18n/routing';

export interface ModernDatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
  value?: Date | null;
  clearable?: boolean;
  placeholder?: string;
  includeTime?: boolean;
  locale?: Locale;
  onChange: (date: Date | null) => void;
}

export interface MonthYearPickerProps {
  value?: string; // Format: "YYYY-MM"
  error?: boolean;
  minDate?: string; // Format: "YYYY-MM"
  maxDate?: string; // Format: "YYYY-MM"
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  placeholder?: string;
  onChange: (value: string | null) => void;
}
