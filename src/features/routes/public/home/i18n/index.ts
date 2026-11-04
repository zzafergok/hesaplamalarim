import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { PublicHomeCopy } from '../types';

const messages: Record<Locale, PublicHomeCopy> = {
  tr: tr as unknown as PublicHomeCopy,
  en: en as unknown as PublicHomeCopy,
};

export function getPublicHomeCopy(
  locale: Locale = routing.defaultLocale,
): PublicHomeCopy {
  return messages[locale];
}
