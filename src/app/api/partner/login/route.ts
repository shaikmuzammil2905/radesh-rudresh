import { NextResponse } from 'next/server';
import { getPartnerByPhone, getPartners } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required.' },
        { status: 400 }
      );
    }

    const partner = getPartnerByPhone(phone);
    if (!partner) {
      return NextResponse.json(
        { success: false, message: 'No registered partner account found with this phone number. Please register.' },
        { status: 404 }
      );
    }

    // Verify password if provided
    if (password && partner.password && partner.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid password. Please check and try again.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      partner,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Login error' },
      { status: 500 }
    );
  }
}
