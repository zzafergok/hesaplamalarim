import { NextResponse } from 'next/server';
import { destroyAdminSession, destroySession } from '@/lib/auth/session';

export async function POST() {
  try {
    await destroySession();
    await destroyAdminSession();

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 },
    );
  }
}
