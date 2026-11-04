import { routing, type Locale } from '@/i18n/routing';
import en from './en.json';
import tr from './tr.json';
import type { ShellCopy } from '../types';

const messages: Record<Locale, ShellCopy> = {
  tr,
  en,
};

export function getShellCopy(locale: Locale = routing.defaultLocale): ShellCopy {
  return messages[locale];
}
