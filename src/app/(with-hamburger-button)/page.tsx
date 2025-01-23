import KakaoMap from '@/components/KakaoMaps/KakaoMap';
import ProtestInfos from '@/lib/API/ProtestInfos';

export default async function Home() {
    const protests = await ProtestInfos({ date: '123' });
    const latitude = 37.539581447331;
    const longitude = 127.00787604008;
    return (
        <div>
            <KakaoMap latitude={latitude} longitude={longitude} w="100%" h="100dvh" l={8} protests={protests} />
        </div>
    );
}
