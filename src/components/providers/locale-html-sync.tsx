'use client';

import { useEffect } from 'react';

import { useCurrentLocale } from './client-locale-provider';

export function LocaleHtmlSync() {
  const locale = useCurrentLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
