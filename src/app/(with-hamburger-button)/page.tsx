import { getProtestList } from '@/api/protest';
import KakaoMap from '@/components/KakaoMaps/KakaoMap';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: '주변 시위 Now | 오늘의 시위 정보와 집회 정보',
  description: '주변 시위 정보를 지도로 한 눈에 볼 수 있도록 제공하는 서비스 입니다',
  openGraph: {
    title: '주변 시위 Now | 오늘의 시위, 집회 정보',
    description: '주변 시위 정보를 지도로 한 눈에 볼 수 있도록 제공하는 서비스 입니다',
    images: [`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/images/thumbnail.png`],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
  keywords,
};

export default async function Home() {
  const protests = await getProtestList();
  const latitude = 37.57297651;
  const longitude = 126.9743513;
  return (
    <>
      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        w='100%'
        h='calc(100dvh - 14vh)'
        l={8}
        protests={protests}
      />
    </>
  );
}
