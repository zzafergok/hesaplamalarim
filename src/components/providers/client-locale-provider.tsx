'use client';

import { createContext, useContext, useState } from 'react';

import type { Locale } from '@/i18n/routing';
import { setUserLocale } from '@/lib/locale';

type LocaleContextValue = {
  locale: Locale;
  switchLocale: (locale: Locale) => Promise<void>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useCurrentLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useCurrentLocale must be used inside ClientLocaleProvider');
  }

  return context.locale;
}

export function useSwitchLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useSwitchLocale must be used inside ClientLocaleProvider');
  }

  return context.switchLocale;
}

export function ClientLocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const switchLocale = async (nextLocale: Locale) => {
    setLocale(nextLocale);
    await setUserLocale(nextLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
