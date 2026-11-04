import type { FormatDurationOptions } from './types';

export function formatDuration(
  value: number,
  options: FormatDurationOptions = {},
): string {
  const {
    unit = 'milliseconds',
    decimals = 1,
    suffix = true,
    locale = 'tr-TR',
    fallback,
    compact = false,
  } = options;

  if (!Number.isFinite(value)) {
    if (fallback !== undefined) return fallback;
    return suffix ? '0s' : '0';
  }

  const seconds =
    unit === 'milliseconds'
      ? value / 1000
      : unit === 'hours'
        ? value * 3600
        : value;
  let outputValue = unit === 'milliseconds' ? seconds : value;
  let unitSuffix = unit === 'hours' ? 'h' : 's';

  if (compact) {
    if (seconds >= 3600) {
      outputValue = seconds / 3600;
      unitSuffix = 'h';
    } else if (seconds >= 60) {
      outputValue = seconds / 60;
      unitSuffix = 'm';
    } else {
      outputValue = seconds;
      unitSuffix = 's';
    }
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(outputValue);
  return suffix ? `${formatted}${unitSuffix}` : formatted;
}

export function roundTo(value: number, decimals: number = 2): number {
  if (!Number.isFinite(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
