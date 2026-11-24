import { NextResponse } from 'next/server';
import { getProducts, saveProduct, deleteProduct } from '@/lib/db';
import { Product } from '@/types';

export async function GET() {
  const products = getProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.pricePerSqFt) {
      return NextResponse.json(
        { success: false, message: 'Product name and price per sq.ft are required' },
        { status: 400 }
      );
    }

    const product: Product = {
      id: body.id || `prod-${Date.now()}`,
      name: body.name,
      category: body.category || 'Marble',
      pricePerSqFt: Number(body.pricePerSqFt),
      rating: Number(body.rating) || 4.8,
      reviewCount: Number(body.reviewCount) || 10,
      stockStatus: body.stockStatus || 'In Stock',
      availableStockSqFt: Number(body.availableStockSqFt) || 1000,
      vendorName: body.vendorName || 'Radhesh & Rudresh Quarry Division',
      vendorLocation: body.vendorLocation || 'Hyderabad',
      type: body.type || 'Natural Stone',
      finish: body.finish || 'Polished High Gloss',
      thickness: body.thickness || '18mm - 20mm',
      usage: body.usage || 'Flooring, Countertops, Wall Cladding',
      description: body.description || '',
      image: body.image || '/assets/prod_italian_white_grand.png',
      galleryImages: body.galleryImages || [body.image || '/assets/prod_italian_white_grand.png'],
      featured: Boolean(body.featured),
      bestSeller: Boolean(body.bestSeller),
    };

    const saved = saveProduct(product);
    return NextResponse.json({ success: true, product: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing product ID' }, { status: 400 });
    }
    const success = deleteProduct(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
