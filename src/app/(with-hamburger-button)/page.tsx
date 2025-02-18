import KakaoMap from '@/components/KakaoMaps/KakaoMap';
import ProtestInfos from '@/lib/API/ProtestInfos';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '주변 시위 Now',
    description: '주변 시위 정보를 지도로 한 눈에 볼 수 있도록 제공하는 서비스 입니다',
    openGraph: {
        title: '주변 시위 Now',
        description: '주변 시위 정보를 지도로 한 눈에 볼 수 있도록 제공하는 서비스 입니다',
        images: [`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/images/thumbnail.png`],
    },
    icons: {
        icon: '/images/favicon.ico',
    },
};

export default async function Home() {
    const date = new Date().toISOString().split('T')[0];
    const protests = await ProtestInfos({ date: date });
    const latitude = 37.539581447331;
    const longitude = 127.00787604008;
    return (
        <div>
            <KakaoMap
                latitude={latitude}
                longitude={longitude}
                w="100%"
                h="calc(100dvh - 80px)"
                l={8}
                protests={protests}
            />
        </div>
    );
}
