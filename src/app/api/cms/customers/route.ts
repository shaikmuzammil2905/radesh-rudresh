import { NextResponse } from 'next/server';
import { getCustomers, updateCustomerStatus } from '@/lib/db';

export async function GET() {
  try {
    const customers = getCustomers();
    return NextResponse.json({ success: true, customers });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const updated = updateCustomerStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, customer: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
