import { NextRequest, NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';
import { hasAdminSession, hasUserSession } from '@/lib/auth/session';

const AUTH_ENTRY = '/home';
const ADMIN_ENTRY = '/admin';
const ADMIN_LOGIN = '/admin/login';
const LOCALE_HEADER = 'X-NEXT-INTL-LOCALE';

function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  response.headers.set('X-XSS-Protection', '1; mode=block');
  return response;
}

function withLocaleHeader(request: NextRequest): NextResponse {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale =
    cookieLocale &&
    (routing.locales as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : routing.defaultLocale;

  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);

  const response = NextResponse.next({ request: { headers } });
  return applySecurityHeaders(response);
}

function redirectWithSecurity(url: URL): NextResponse {
  const response = NextResponse.redirect(url);
  return applySecurityHeaders(response);
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt'
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname) || pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }

  const hasSession = hasUserSession(request);
  const hasAdmin = hasAdminSession(request);
  const isAdminLogin = pathname === ADMIN_LOGIN;
  const isAdminRoute =
    pathname === ADMIN_ENTRY || pathname.startsWith(`${ADMIN_ENTRY}/`);

  if (isAdminLogin) {
    if (hasAdmin) {
      return redirectWithSecurity(new URL(ADMIN_ENTRY, request.url));
    }
    return withLocaleHeader(request);
  }

  if (isAdminRoute) {
    if (!hasAdmin) {
      return redirectWithSecurity(new URL(ADMIN_LOGIN, request.url));
    }
    return withLocaleHeader(request);
  }

  if (pathname === '/login') {
    if (hasSession) {
      return redirectWithSecurity(new URL(AUTH_ENTRY, request.url));
    }
    return withLocaleHeader(request);
  }

  if (
    pathname === '/' ||
    pathname === '/culture' ||
    pathname.startsWith('/culture/')
  ) {
    return withLocaleHeader(request);
  }

  if (!hasSession) {
    return redirectWithSecurity(new URL('/', request.url));
  }

  return withLocaleHeader(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
