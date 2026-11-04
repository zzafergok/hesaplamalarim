import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AdminLoginCopy } from '../types';

const messages: Record<Locale, AdminLoginCopy> = {
  tr,
  en,
};

export function getAdminLoginCopy(
  locale: Locale = routing.defaultLocale,
): AdminLoginCopy {
  return messages[locale];
}
