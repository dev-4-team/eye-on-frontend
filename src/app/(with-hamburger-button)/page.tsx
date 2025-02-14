import KakaoMap from '@/components/KakaoMaps/KakaoMap';
import ProtestInfos from '@/lib/API/ProtestInfos';

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
