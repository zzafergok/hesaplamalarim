import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession, createSession } from '@/lib/auth/session';
import { signToken } from '@/lib/auth/jwt';
import { loginSchema } from '@/lib/auth/auth-schema';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const parseResult = loginSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const firstError =
        parseResult.error.errors[0]?.message ?? 'Geçersiz giriş bilgileri';
      return NextResponse.json(
        {
          message: firstError,
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, isAdmin } = parseResult.data;

    // Role simulation
    const role = isAdmin ? 'admin' : 'user';
    const name = email.split('@')[0].toUpperCase();
    const userId = isAdmin ? 'admin_123' : 'user_456';

    const token = signToken({
      sub: userId,
      email,
      name,
      role,
    });

    // Set secure HTTP-Only session cookie on server
    if (isAdmin) {
      await createAdminSession(token);
    } else {
      await createSession(token);
    }

    return NextResponse.json(
      {
        message: 'Giriş başarılı',
        token,
        user: {
          id: userId,
          email,
          name,
          role,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: 'Kimlik doğrulama sırasında bir hata oluştu' },
      { status: 500 },
    );
  }
}
