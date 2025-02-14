import StaticKakakoMap from '@/components/KakaoMaps/StaticKakaoMap';
import ProtestDetailInfo from '@/components/Protest/protest-detail-info';
import ProtestDetail from '@/lib/API/ProtestDetail';
import { ProtestData } from '@/types';
import { formatDate } from '@/lib/utils';
// import Verification from '@/components/Verification/Verification';

export async function generateStaticParams() {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    const response = await fetch(`${SERVER_URL}/api/protest?date=2025-03-15`, { cache: 'force-cache' });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const protestsData = await response.json();

    const protests: ProtestData[] = protestsData.data;

    return protests.map((protest) => ({
        id: protest.id.toString(),
    }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramId } = await params;

    const protest = await ProtestDetail({ id: `${paramId}` });
    console.log(protest);

    const { id, title, description, startDateTime, endDateTime, location, organizer, declaredParticipants, locations } =
        protest;

    const startTime = formatDate(startDateTime);
    const endTime = formatDate(endDateTime);

    return (
        <section className='bg-zinc-100 h-[100dvh] w-full min-w-[260px]'>
            <div className='flex bg-background-white'>
                <div className='flex flex-col gap-0.1 py-3 bg-background-white w-[80%]'>
                    <h1 className='text-amber-500 w-[85%] min-w-[240px] mx-auto font-bold'>{title}</h1>
                    <span className='text-zinc-400 w-[85%] min-w-[240px] mx-auto  text-sm'>{location}</span>
                </div>
                {/* <div className="w-[20%]">
                    <Verification />
                </div> */}
            </div>
            <div className='flex flex-col h-[calc(100%-68px)] justify-evenly'>
                <ProtestDetailInfo name={'시위 정보'} info={description} />
                <ProtestDetailInfo name={'시작 일시'} info={startTime} />
                <ProtestDetailInfo name={'종료 일시'} info={endTime} />
                <ProtestDetailInfo name={'주최자'} info={organizer} />
                <ProtestDetailInfo name={'예상 참가 인원'} info={`${declaredParticipants.toLocaleString()}명`} />
                <StaticKakakoMap
                    latitude={locations[0].latitude}
                    longitude={locations[0].longitude}
                    w={'85%'}
                    minW={'240px'}
                    h={'20%'}
                    minH={'100px'}
                    l={3}
                />
            </div>
        </section>
    );
}
