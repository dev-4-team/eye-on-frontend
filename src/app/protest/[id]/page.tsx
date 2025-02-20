import StaticKakakoMap from '@/components/KakaoMaps/StaticKakaoMap';
import ProtestDetailInfo from '@/components/Protest/protest-detail-info';
import ProtestDetail from '@/lib/API/ProtestDetail';
import { ProtestData } from '@/types';
import { formatDate } from '@/lib/utils';
import Verification from '@/components/Verification/Verification';
import { Metadata } from 'next';
import MarkdownWrapper from '@/components/Protest/protest-md';
import { ProtestShareButton } from '@/components/Protest/ProtestShareButton';

export async function generateStaticParams() {
    const date = new Date().toISOString().split('T')[0];
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    const response = await fetch(`${SERVER_URL}/api/protest?date=${date}`, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const protestsData = await response.json();

    const protests: ProtestData[] = protestsData.data;

    return protests.map((protest) => ({
        id: protest.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    const protest = await ProtestDetail({ id });

    return {
        title: `${protest.title}`,
        description: `${protest.title}의 상세정보 페이지 입니다`,
        openGraph: {
            title: `${protest.title}`,
            description: `${protest.title}의 상세정보 페이지 입니다`,
            images: ['/images/thumbnail.png'],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramId } = await params;
    const protest = await ProtestDetail({ id: `${paramId}` });

    const { title, description, startDateTime, endDateTime, location, organizer, declaredParticipants, locations } =
        protest;

    const startTime = formatDate(startDateTime);
    const endTime = formatDate(endDateTime);

    return (
        <section className='w-full min-w-[240px] break-words flex flex-col'>
            <div className='flex justify-between items-center bg-white px-4 py-3 shadow-md'>
                <div className='flex flex-col'>
                    <h1 className='text-[#D44646] px-2 text-lg sm:text-xl font-bold'>{title}</h1>
                    <span className='text-zinc-400 text-sm sm:text-base'>{location}</span>
                </div>
            </div>

            <div className='flex flex-col flex-grow gap-3 py-5 items-center justify-center'>
                <p className='mx-auto mb-1 w-[85%] min-w-[240px] text-zinc-600 text-xs'>시위정보</p>
                <MarkdownWrapper content={description} />
                <ProtestDetailInfo name='시작 일시' info={startTime} />
                <ProtestDetailInfo name='종료 일시' info={endTime} />
                <p className='mx-auto mb-1 w-[85%] min-w-[240px] text-zinc-600 text-xs'>주최자</p>
                <MarkdownWrapper content={organizer} />
                <ProtestDetailInfo name='예상 참가 인원' info={`${declaredParticipants.toLocaleString()}명`} />
                <div className='flex justify-center p-4'>
                    <StaticKakakoMap
                        latitude={locations[0].latitude}
                        longitude={locations[0].longitude}
                        w='100%'
                        h='250px'
                        minW='240px'
                        minH='150px'
                        l={3}
                    />
                </div>
                <div className='flex w-full items-center justify-center gap-4 px-4'>
                    <Verification paramId={paramId} />
                    <ProtestShareButton />
                </div>
            </div>
        </section>
    );
}
