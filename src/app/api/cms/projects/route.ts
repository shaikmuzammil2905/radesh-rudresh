import { NextResponse } from 'next/server';
import { getProjects, saveProject, deleteProject } from '@/lib/db';
import { Project } from '@/types';

export async function GET() {
  const projects = getProjects();
  return NextResponse.json({ success: true, projects });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, message: 'Project title is required' }, { status: 400 });
    }

    const project: Project = {
      id: body.id || `proj-${Date.now()}`,
      title: body.title,
      client: body.client || 'Radhesh & Rudresh Client',
      location: body.location || 'Hyderabad, Telangana',
      category: body.category || 'Residential',
      image: body.image || '/assets/hero_slide_1.png',
      galleryImages: body.galleryImages || [body.image || '/assets/hero_slide_1.png'],
      description: body.description || '',
      completionYear: body.completionYear || '2025',
      featured: Boolean(body.featured),
    };

    const saved = saveProject(project);
    return NextResponse.json({ success: true, project: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    const success = deleteProject(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
