import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET() {
  revalidateTag('protestList');
  revalidateTag('sitemap');
  return NextResponse.json({ success: true, message: 'Cache invalidated' });
}
