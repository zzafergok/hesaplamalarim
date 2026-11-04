import { toBCP47Locale } from '@/i18n/routing';
import type { FormatPercentOptions } from './types';

export function formatPercent(
  value: number,
  options: FormatPercentOptions = {},
): string {
  const {
    decimals = 2,
    clamp = true,
    suffix = false,
    fallback,
    min,
    max,
    useGrouping = false,
    showPositiveSign = false,
  } = options;
  const locale = toBCP47Locale(options.locale);

  if (!Number.isFinite(value)) {
    if (fallback !== undefined) return fallback;
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(0);
  }

  let processedValue = clamp ? Math.max(0, Math.min(100, value)) : value;

  if (min !== undefined && processedValue > 0 && processedValue < min) {
    const formattedMin = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(min);
    return `<${formattedMin}${suffix ? '%' : ''}`;
  }

  if (max !== undefined && processedValue > max) {
    const formattedMax = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(max);
    return `>${formattedMax}${suffix ? '%' : ''}`;
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
    signDisplay: showPositiveSign ? 'exceptZero' : 'auto',
  }).format(processedValue);
  return suffix ? `${formatted}%` : formatted;
}
