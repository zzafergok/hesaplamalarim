import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { PublicCultureCopy } from '../types';

const messages: Record<Locale, PublicCultureCopy> = {
  tr,
  en,
};

export function getPublicCultureCopy(
  locale: Locale = routing.defaultLocale,
): PublicCultureCopy {
  return messages[locale];
}
