export interface FormatPercentOptions {
  decimals?: number;
  locale?: string;
  clamp?: boolean;
  suffix?: boolean;
  fallback?: string;
  min?: number;
  max?: number;
  useGrouping?: boolean;
  showPositiveSign?: boolean;
}

export interface FormatCurrencyOptions {
  decimals?: number | 'auto';
  locale?: string;
  currency?: string;
  symbol?: boolean;
  compact?: boolean;
  fallback?: string;
  scientific?: boolean;
  min?: number;
  showPositiveSign?: boolean;
}

export interface FormatDurationOptions {
  unit?: 'milliseconds' | 'seconds' | 'hours';
  decimals?: number;
  suffix?: boolean;
  locale?: string;
  fallback?: string;
  compact?: boolean;
}
