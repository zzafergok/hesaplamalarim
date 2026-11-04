'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { routing, type Locale } from '@/i18n/routing';
import {
  useCurrentLocale,
  useSwitchLocale,
} from '@/components/providers/client-locale-provider';
import { CompactControl } from '@/components/shared/compact-control';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
};

export function LanguageSwitcher() {
  const locale = useCurrentLocale();
  const switchLocale = useSwitchLocale();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const handleLocaleChange = async (nextLocale: Locale) => {
    if (nextLocale === locale || pendingLocale) return;

    setPendingLocale(nextLocale);
    try {
      await switchLocale(nextLocale);
      router.refresh();
    } finally {
      setPendingLocale(null);
    }
  };

  const nextLocale =
    routing.locales[
      (routing.locales.indexOf(locale) + 1) % routing.locales.length
    ];

  return (
    <CompactControl
      onClick={() => void handleLocaleChange(nextLocale)}
      disabled={pendingLocale !== null || routing.locales.length < 2}
      className="font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-gunmetal/30"
      aria-label={`Switch language to ${localeLabels[nextLocale]}`}
      title={`Switch language to ${localeLabels[nextLocale]}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.18,
            ease: 'easeOut',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {localeLabels[locale]}
        </motion.span>
      </AnimatePresence>
    </CompactControl>
  );
}
