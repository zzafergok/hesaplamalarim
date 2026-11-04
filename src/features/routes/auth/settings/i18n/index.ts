import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AuthSettingsCopy } from '../types';

const messages: Record<Locale, AuthSettingsCopy> = {
  tr,
  en,
};

export function getAuthSettingsCopy(
  locale: Locale = routing.defaultLocale,
): AuthSettingsCopy {
  return messages[locale];
}
