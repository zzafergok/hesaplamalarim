import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AuthHomeCopy } from '../types';

const messages: Record<Locale, AuthHomeCopy> = {
  tr: tr as unknown as AuthHomeCopy,
  en: en as unknown as AuthHomeCopy,
};

export function getAuthHomeCopy(
  locale: Locale = routing.defaultLocale,
): AuthHomeCopy {
  return messages[locale];
}
