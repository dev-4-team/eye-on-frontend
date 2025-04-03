import VerificationNumber from '@/lib/API/VerificationNumber';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { ProtestData } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { VerificationBadge } from '@/components/Protest/VerificationBadge';
import { useSocketStore } from '@/store/useSocketStore';
import { UseProtestCheerCount } from '@/lib/API/ProtestCheerCount';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';

export default function ProtestVerificationBadge({
    protest,
    mapInstance,
    router,
}: {
    protest: ProtestData;
    mapInstance: any;
    router: AppRouterInstance;
}) {
    const [verifiedNumber, setVerifiedNumber] = useState(0);
    const date = new Date().toISOString().split('T')[0];
    const { socketIsReady } = useSocketStore();
    const { data } = UseProtestCheerCount(protest.id, socketIsReady);
    const { effect } = useCheerEffect(data);
    const { cheerList, realtimeCheerIds } = useProtestCheerStore();

    useEffect(() => {
        const verifyNumber = async () => {
            const result = await VerificationNumber({
                protestId: protest.id,
                date: date,
            });
            setVerifiedNumber(result.verifiedNum);
        };
        verifyNumber();
    }, [protest]);

    // 실시간 응원 여부 확인
    const isRealtimeCheer = realtimeCheerIds.has(protest.id);

    const maxVerified = 5000;
    const baseZIndex = 10;
    const maxZIndex = 100;

    const dynamicZIndex = Math.min(maxZIndex, baseZIndex + (verifiedNumber / maxVerified) * maxZIndex);

    const onMarkerClick = (id: string, lat: number, long: number) => {
        if (mapInstance) {
            const destLatLng = new kakao.maps.LatLng(lat, long);
            mapInstance.panTo(destLatLng);
        }
        router.push(`/protest/${id}`);
    };
    const cheerCountCalculater = socketIsReady
        ? cheerList.find((cheer) => cheer.protestId === protest.id)?.cheerCount
        : data?.cheerCount;

    return (
        <>
            <CustomOverlayMap
                position={{
                    lat: protest.locations[0].latitude,
                    lng: protest.locations[0].longitude,
                }}
                yAnchor={3}
                zIndex={dynamicZIndex}
            >
                {cheerCountCalculater && (
                    <div className='flex flex-col justify-center items-center'>
                        {(effect || isRealtimeCheer) && (
                            <div className={`animate-bounce ${isRealtimeCheer ? 'text-red-500' : ''}`}>🔥</div>
                        )}
                        <div>{cheerCountCalculater}</div>
                    </div>
                )}
                <VerificationBadge verifiedNumber={verifiedNumber} />
            </CustomOverlayMap>
            <MapMarker
                position={{
                    lat: protest.locations[0].latitude,
                    lng: protest.locations[0].longitude,
                }}
                image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                    size: {
                        width: 24,
                        height: 35,
                    },
                }}
                title={protest.title}
                clickable={true}
                onClick={() => onMarkerClick(protest.id, protest.locations[0].latitude, protest.locations[0].longitude)}
            />
        </>
    );
}
