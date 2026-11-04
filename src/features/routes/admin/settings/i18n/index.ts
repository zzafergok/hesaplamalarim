import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AdminSettingsCopy } from '../types';

const messages: Record<Locale, AdminSettingsCopy> = {
  tr,
  en,
};

export function getAdminSettingsCopy(
  locale: Locale = routing.defaultLocale,
): AdminSettingsCopy {
  return messages[locale];
}
