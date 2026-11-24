import { NextResponse } from 'next/server';
import { getEnquiries, addEnquiry, updateEnquiryStatus, deleteEnquiry } from '@/lib/db';

export async function GET() {
  const enquiries = getEnquiries();
  return NextResponse.json({ success: true, enquiries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, message: 'Name and phone are required' }, { status: 400 });
    }

    const created = addEnquiry({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      subject: body.subject || 'Marble / Worker Inquiry',
      message: body.message || '',
      status: 'New',
      notes: body.notes,
    });

    return NextResponse.json({ success: true, enquiry: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, message: 'ID and status are required' }, { status: 400 });
    }

    const updated = updateEnquiryStatus(body.id, body.status, body.notes);
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    const success = deleteEnquiry(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
