import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get('start');
    const goal = searchParams.get('goal');
    const waypoints = searchParams.get('waypoints');

    if (!start || !goal) {
        return NextResponse.json({ error: '출발지와 목적지는 필수입니다.' }, { status: 400 });
    }

    const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${start}&goal=${goal}&waypoints=${
        waypoints || ''
    }&option=trafast`;

    const response = await fetch(apiUrl, {
        headers: {
            'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '',
            'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || '',
        },
        cache: 'force-cache',
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        return NextResponse.json({ error: '경로 검색 실패' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
