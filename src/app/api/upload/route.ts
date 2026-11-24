import { NextResponse } from 'next/server';
import { uploadBufferToS3, listS3Objects } from '@/lib/s3';

export async function GET() {
  try {
    const files = await listS3Objects('media/');
    return NextResponse.json({ success: true, files });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message, files: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'media';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to AWS S3 bucket rudra-infra
    const { url, key } = await uploadBufferToS3(buffer, file.name, file.type || 'image/jpeg', folder);

    return NextResponse.json({
      success: true,
      url,
      key,
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type,
    });
  } catch (err: any) {
    console.error('Upload API Error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to upload to AWS S3' },
      { status: 500 }
    );
  }
}
