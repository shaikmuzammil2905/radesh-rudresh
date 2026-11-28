import { NextResponse } from 'next/server';
import { getCoupons, saveCoupon, deleteCoupon } from '@/lib/db';

export async function GET() {
  try {
    const coupons = getCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const coupon = saveCoupon({
      ...body,
      id: body.id || `cpn-${Date.now()}`,
      usageCount: body.usageCount || 0,
      status: body.status || 'Active',
    });
    return NextResponse.json({ success: true, coupon });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    deleteCoupon(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
