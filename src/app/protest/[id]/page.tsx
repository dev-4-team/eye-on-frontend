import type { Metadata } from 'next';
import Verification from '@/components/Verification/Verification';
import StaticKakaoMap from '@/components/KakaoMaps/StaticKakaoMap';
import MarkdownWrapper from '@/components/Protest/MarkdownWrapper';
import ProtestDetailInfo from '@/components/Protest/ProtestDetailInfo';
import ProtestDetailCheer from '@/components/Protest/ProtestDetailCheer';
import ProtestShareButton from '@/components/Protest/ProtestShareButton';
import { formatDate, withSafe } from '@/lib/utils';
import { getProtestDetail, getProtestList } from '@/api/protest';

export async function generateStaticParams() {
  const protests = await getProtestList();
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
  const protest = await getProtestDetail({ protestId: id });

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
  const protest = await getProtestDetail({ protestId: paramId });

  const {
    title,
    description,
    startDateTime,
    endDateTime,
    organizer,
    declaredParticipants,
    locations,
  } = protest;

  return (
    <section className='flex flex-col'>
      <div className='flex justify-between items-center bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-md'>
        <h1 className='text-[#D44646] text-base sm:text-base md:text-lg lg:text-xl font-bold break-words px-2'>
          {title}
        </h1>
        <div className='flex items-center'>
          <ProtestShareButton className='bg-red-500 border-none text-white px-2 py-2 rounded-md hover:bg-red-600 transition-colors' />
        </div>
      </div>

      <div className='flex flex-col flex-grow gap-2 sm:gap-3 py-3 sm:py-4 md:py-5 items-center justify-center'>
        <h2 className='mx-auto mb-1 font-bold w-[90%] sm:w-[85%] text-zinc-600 text-base sm:text-sm md:text-base'>
          오늘의 집회 및 시위 일정
        </h2>
        <p className='mx-auto w-[90%] sm:w-[85%] text-zinc-600 text-sm'>시위정보</p>
        <MarkdownWrapper content={description || ''} />
        <ProtestDetailInfo
          name='시작 일시'
          info={withSafe({
            arg: startDateTime,
            callback: formatDate,
            fallback: new Date().toISOString(),
          })}
        />
        <ProtestDetailInfo
          name='종료 일시'
          info={withSafe({
            arg: endDateTime,
            callback: formatDate,
            fallback: new Date().toISOString(),
          })}
        />
        <p className='mx-auto  w-[90%] sm:w-[85%] text-zinc-600 text-sm'>주최자</p>
        <MarkdownWrapper content={organizer} />
        <ProtestDetailInfo
          name='예상 참가 인원'
          info={`${declaredParticipants.toLocaleString()}명`}
        />
        {locations[0] && (
          <div className='flex justify-center p-4'>
            <StaticKakaoMap
              latitude={locations[0].latitude}
              longitude={locations[0].longitude}
              w='100%'
              h='250px'
              minW='240px'
              minH='150px'
              l={3}
            />
          </div>
        )}
        <div className='flex items-center justify-center gap-2 mt-2'>
          <ProtestDetailCheer protestId={paramId} />
          <Verification paramId={paramId} />
        </div>
      </div>
    </section>
  );
}
