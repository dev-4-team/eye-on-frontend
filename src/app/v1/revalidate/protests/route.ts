import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET() {
  revalidateTag('protestList');
  revalidateTag('sitmap');
  return NextResponse.json({ success: true, message: 'Cache invalidated' });
}
