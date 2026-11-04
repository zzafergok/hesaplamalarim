'use client';

import { useCallback } from 'react';
import { useCurrentLocale } from '@/components/providers/client-locale-provider';
import { toBCP47Locale, type Locale } from '@/i18n/routing';
import { formatCurrency, formatDuration, formatPercent } from '@/lib/utils';

export function useI18n<TCopy = Record<string, unknown>>(
  getCopy?: (locale: Locale) => TCopy,
) {
  const locale = useCurrentLocale();
  const bcp47Locale = toBCP47Locale(locale);

  const copy = getCopy ? getCopy(locale) : ({} as TCopy);

  const formatMoney = useCallback(
    (
      value: number,
      options?: Omit<Parameters<typeof formatCurrency>[1], 'locale'>,
    ) => formatCurrency(value, { locale: bcp47Locale, ...options }),
    [bcp47Locale],
  );

  const formatPercentage = useCallback(
    (
      value: number,
      options?: Omit<Parameters<typeof formatPercent>[1], 'locale'>,
    ) => formatPercent(value, { locale: bcp47Locale, ...options }),
    [bcp47Locale],
  );

  const formatTimeSpan = useCallback(
    (
      value: number,
      options?: Omit<Parameters<typeof formatDuration>[1], 'locale'>,
    ) => formatDuration(value, { locale: bcp47Locale, ...options }),
    [bcp47Locale],
  );

  const formatDate = useCallback(
    (date: Date | number, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(bcp47Locale, options).format(date),
    [bcp47Locale],
  );

  return {
    locale,
    bcp47Locale,
    copy,
    formatMoney,
    formatPercentage,
    formatTimeSpan,
    formatDate,
  };
}
