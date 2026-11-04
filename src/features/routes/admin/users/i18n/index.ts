import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AdminUsersCopy } from '../types';

const messages: Record<Locale, AdminUsersCopy> = {
  tr,
  en,
};

export function getAdminUsersCopy(
  locale: Locale = routing.defaultLocale,
): AdminUsersCopy {
  return messages[locale];
}
