import { NextResponse } from 'next/server';
import { getWithdrawals, updateWithdrawalStatus } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const withdrawals = getWithdrawals();
    return NextResponse.json(
      { success: true, withdrawals },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const updated = updateWithdrawalStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Withdrawal not found' }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, withdrawal: updated },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
