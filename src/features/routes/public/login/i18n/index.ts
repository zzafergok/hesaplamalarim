import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { PublicLoginCopy } from '../types';

const messages: Record<Locale, PublicLoginCopy> = {
  tr,
  en,
};

export function getPublicLoginCopy(
  locale: Locale = routing.defaultLocale,
): PublicLoginCopy {
  return messages[locale];
}
