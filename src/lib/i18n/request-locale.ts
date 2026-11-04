import type { NextRequest } from 'next/server';

import { normalizeLocale, routing, type Locale } from '@/i18n/routing';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function resolveRequestLocale(
  request: Pick<NextRequest, 'cookies'>,
  explicitLocale?: unknown,
): Locale {
  return (
    normalizeLocale(explicitLocale) ??
    normalizeLocale(request.cookies.get(LOCALE_COOKIE)?.value) ??
    routing.defaultLocale
  );
}
