import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionToken, getSessionToken } from '@/lib/auth/session';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
  try {
    // 1. Try Bearer header token
    const authHeader = request.headers.get('Authorization');
    let token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    // 2. Fallback to HTTP-Only Cookie
    if (!token) {
      token = (await getSessionToken()) || (await getAdminSessionToken());
    }

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: No token provided' },
        { status: 401 },
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { message: 'Unauthorized: Invalid or expired token' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'An error occurred fetching user profile' },
      { status: 500 },
    );
  }
}
