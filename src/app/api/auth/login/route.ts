import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@radheshrudresh.com';
    const expectedPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@Rudra2026!';

    if (
      email?.trim().toLowerCase() === expectedEmail.toLowerCase() &&
      password === expectedPassword
    ) {
      const response = NextResponse.json({
        success: true,
        user: {
          email: expectedEmail,
          role: 'Super Admin',
          name: 'Managing Director',
        },
      });

      // Set auth cookie
      response.cookies.set('rr_admin_token', 'radhesh-rudresh-authenticated-admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid administrative email or password' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
