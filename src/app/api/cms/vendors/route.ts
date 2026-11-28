import { NextResponse } from 'next/server';
import { getVendors, saveVendor, updateVendorStatus, deleteVendor } from '@/lib/db';

export async function GET() {
  try {
    const vendors = getVendors();
    return NextResponse.json({ success: true, vendors });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const vendor = saveVendor({
      ...body,
      id: body.id || `vend-${Date.now()}`,
      productsCount: body.productsCount || 0,
      totalSales: body.totalSales || 0,
      walletBalance: body.walletBalance || 0,
      commissionRate: body.commissionRate || 8,
      joinedDate: body.joinedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    return NextResponse.json({ success: true, vendor });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, kycStatus } = await req.json();
    const updated = updateVendorStatus(id, status, kycStatus);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Vendor not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, vendor: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
