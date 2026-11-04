import { cookies } from 'next/headers';

import { normalizeLocale, routing, type Locale } from '@/i18n/routing';
import { LOCALE_COOKIE } from './request-locale';

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (
    normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value) ??
    routing.defaultLocale
  );
}
