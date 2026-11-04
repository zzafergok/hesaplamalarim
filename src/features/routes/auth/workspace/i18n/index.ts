import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { AuthWorkspaceCopy } from '../types';

const messages: Record<Locale, AuthWorkspaceCopy> = {
  tr,
  en,
};

export function getAuthWorkspaceCopy(
  locale: Locale = routing.defaultLocale,
): AuthWorkspaceCopy {
  return messages[locale];
}
