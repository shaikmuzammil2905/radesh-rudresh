import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getHeroSlides, saveHeroSlides, getCategories, saveCategories, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const slides = getHeroSlides();
  const categories = getCategories();
  const settings = getSettings();
  return NextResponse.json(
    { success: true, slides, categories, settings },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
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
    
    // Revalidate storefront and home paths so public site immediately displays changes
    try {
      revalidatePath('/');
      revalidatePath('/', 'layout');
    } catch {}

    return NextResponse.json({ success: true, message: 'Homepage CMS updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
