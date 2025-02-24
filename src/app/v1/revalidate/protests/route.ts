import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, message: 'Cache invalidated' });
}
