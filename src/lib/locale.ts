'use server';

import { cookies } from 'next/headers';

import type { Locale } from '@/i18n/routing';
import { LOCALE_COOKIE } from './i18n/request-locale';

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
