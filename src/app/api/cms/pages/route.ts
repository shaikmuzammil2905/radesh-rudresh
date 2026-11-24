import { NextResponse } from 'next/server';
import { getHeroSlides, saveHeroSlides, getCategories, saveCategories, getSettings } from '@/lib/db';

export async function GET() {
  const slides = getHeroSlides();
  const categories = getCategories();
  const settings = getSettings();
  return NextResponse.json({ success: true, slides, categories, settings });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (body.slides) {
      saveHeroSlides(body.slides);
    }
    if (body.categories) {
      saveCategories(body.categories);
    }
    return NextResponse.json({ success: true, message: 'Homepage CMS updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
