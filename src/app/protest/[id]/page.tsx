import StaticKakakoMap from '@/components/KakaoMaps/StaticKakaoMap';
import ProtestDetailInfo from '@/components/Protest/protest-detail-info';
import { ProtestData } from '@/types';
import { formatDate } from '@/lib/utils';
import Verification from '@/components/Verification/Verification';
import { Metadata } from 'next';
import MarkdownWrapper from '@/components/Protest/protest-md';
import { ProtestShareButton } from '@/components/Protest/ProtestShareButton';
import { getProtestDetail, getProtestList } from '@/apis/protest';
import { ProtestDetailCheer } from '@/components/Protest/ProtestDetailCheer';

export async function generateStaticParams() {
  const protests: ProtestData[] = await getProtestList();
  return protests.map(protest => ({
    id: protest.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const protest = await getProtestDetail(id);

  const keywords = [
    '집회',
    '서울 집회',
    '오늘 집회 일정',
    '광화문 집회',
    '여의도 집회',
    '국회의사당 집회',
    '헌법재판소 집회',
    '촛불집회',
    '시위',
    '서울 시위',
    '오늘 시위 일정',
    '광화문 시위',
    '여의도 시위',
    '국회의사당 시위',
    '헌법재판소 시위',
    '촛불시위',
    '오늘의 집회/시위',
  ].join(', ');

  return {
    title: `${protest.title} | 오늘의 시위 정보와 집회 정보`,
    description: `${protest.title}의 상세정보 페이지 입니다`,
    openGraph: {
      title: `${protest.title}`,
      description: `${protest.title}의 상세정보 페이지 입니다`,
      images: [`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/images/thumbnail.png`],
    },
    icons: {
      icon: '/images/favicon.ico',
    },
    keywords,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params;
  const protest = await getProtestDetail(paramId);

  const {
    title,
    description,
    startDateTime,
    endDateTime,
    location,
    organizer,
    declaredParticipants,
    locations,
  } = protest;

  const startTime = formatDate(startDateTime);
  const endTime = formatDate(endDateTime);

  return (
    <section className='w-full min-w-[240px] break-words flex flex-col px-2'>
      <div className='flex justify-between items-center bg-white px-4 py-3 shadow-md'>
        <div className='flex flex-col'>
          <h1 className='text-[#D44646] px-2 text-lg sm:text-xl font-bold'>{title}</h1>
          <span className='text-zinc-400 text-sm sm:text-base'>{location}</span>
        </div>
      </div>

      <div className='flex flex-col flex-grow gap-3 py-5 items-center justify-center'>
        <h2 className='mx-auto mb-1 font-bold w-[85%] min-w-[240px] text-zinc-600 text-lx'>
          오늘의 집회 및 시위 일정
        </h2>
        <p className='mx-auto mb-1 w-[85%] min-w-[240px] text-zinc-600 text-xs'>시위정보</p>
        <MarkdownWrapper content={description} />
        <ProtestDetailInfo name='시작 일시' info={startTime} />
        <ProtestDetailInfo name='종료 일시' info={endTime} />
        <p className='mx-auto mb-1 w-[85%] min-w-[240px] text-zinc-600 text-xs'>주최자</p>
        <MarkdownWrapper content={organizer} />
        <ProtestDetailInfo
          name='예상 참가 인원'
          info={`${declaredParticipants.toLocaleString()}명`}
        />
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
        <div className='flex w-full items-center justify-center gap-2'>
          <ProtestDetailCheer protestId={paramId} />
          <Verification paramId={paramId} />
          <div className='flex items-center justify-center flex-col text-black'>
            <ProtestShareButton />
            <span className='text-xs b-0 text-nowrap text-zinc-600'>시위 공유하기</span>
          </div>
        </div>
      </div>
    </section>
  );
}
