import { toBCP47Locale } from '@/i18n/routing';
import type { FormatCurrencyOptions } from './types';

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {},
): string {
  const {
    decimals = 2,
    currency = 'TRY',
    symbol = true,
    compact = false,
    fallback,
    scientific = false,
    min,
    showPositiveSign = false,
  } = options;
  const locale = toBCP47Locale(options.locale);

  if (!Number.isFinite(value)) {
    if (fallback !== undefined) return fallback;
    return symbol
      ? new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(0)
      : '0,00';
  }

  if (min !== undefined && value > 0 && value < min) {
    return `<${formatCurrency(min, { ...options, min: undefined })}`;
  }

  if (scientific && Math.abs(value) > 0 && Math.abs(value) < 0.0001) {
    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const mantissa = value / Math.pow(10, exponent);
    const superscriptMap: Record<string, string> = {
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
      '-': '⁻',
    };
    const superscriptExp = String(exponent)
      .split('')
      .map((character) => superscriptMap[character] || character)
      .join('');
    return `${symbol ? '₺' : ''}${mantissa.toFixed(2)}×10${superscriptExp}`;
  }

  const decimalPlaces = decimals === 'auto' ? 2 : decimals;

  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat(locale, {
      style: symbol ? 'currency' : 'decimal',
      currency: symbol ? currency : undefined,
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: showPositiveSign ? 'exceptZero' : 'auto',
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    style: symbol ? 'currency' : 'decimal',
    currency: symbol ? currency : undefined,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    signDisplay: showPositiveSign ? 'exceptZero' : 'auto',
  }).format(value);
}
