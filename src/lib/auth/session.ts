import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export const SESSION_COOKIE = 'session';
export const ADMIN_SESSION_COOKIE = 'admin_session';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days
};

// ── Next.js Middleware Helpers ──────────────────────────────────────────────

function readCookie(request: NextRequest, name: string): string | null {
  const value = request.cookies.get(name)?.value;
  return value && value.trim().length > 0 ? value : null;
}

export function hasUserSession(request: NextRequest): boolean {
  return Boolean(readCookie(request, SESSION_COOKIE));
}

export function hasAdminSession(request: NextRequest): boolean {
  return Boolean(readCookie(request, ADMIN_SESSION_COOKIE));
}

// ── Server Actions & Server Component Helpers ───────────────────────────────

export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, COOKIE_OPTIONS);
}

export async function createAdminSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, COOKIE_OPTIONS);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function getAdminSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? null;
}
