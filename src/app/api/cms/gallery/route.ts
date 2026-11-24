import { NextResponse } from 'next/server';
import { getGallery, saveGalleryItem, deleteGalleryItem } from '@/lib/db';
import { GalleryItem } from '@/types';

export async function GET() {
  const gallery = getGallery();
  return NextResponse.json({ success: true, gallery });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.image) {
      return NextResponse.json({ success: false, message: 'Title and image are required' }, { status: 400 });
    }

    const item: GalleryItem = {
      id: body.id || `gal-${Date.now()}`,
      title: body.title,
      category: body.category || 'Marble',
      image: body.image,
      description: body.description || '',
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map((t: string) => t.trim()),
    };

    const saved = saveGalleryItem(item);
    return NextResponse.json({ success: true, item: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    const success = deleteGalleryItem(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
