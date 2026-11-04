import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AdminOverviewCopy } from '../types';

const messages: Record<Locale, AdminOverviewCopy> = {
  tr: tr as unknown as AdminOverviewCopy,
  en: en as unknown as AdminOverviewCopy,
};

export function getAdminOverviewCopy(
  locale: Locale = routing.defaultLocale,
): AdminOverviewCopy {
  return messages[locale];
}
