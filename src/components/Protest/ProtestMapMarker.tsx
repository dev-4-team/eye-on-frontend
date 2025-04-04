import { useEffect, useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { ProtestData } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getVerificationNumber } from '@/apis/verification';
import { useSocketStore } from '@/store/useSocketStore';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';

export default function ProtestMapMarker({
    protest,
    mapInstance,
    router,
}: {
    protest: ProtestData;
    mapInstance: any;
    router: AppRouterInstance;
}) {
    const [verifiedNumber, setVerifiedNumber] = useState(0);

    useEffect(() => {
        const verifyNumber = async () => {
            const result = await getVerificationNumber(protest.id);
            setVerifiedNumber(result.verifiedNum);
        };
        verifyNumber();
    }, [protest]);

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

    const { socketIsReady } = useSocketStore();
    const { data } = UseProtestCheerCount(protest.id, socketIsReady);

    const { effect } = useCheerEffect(data);
    const { cheerList, realtimeCheerIds } = useProtestCheerStore();
    const isRealtimeCheer = realtimeCheerIds.has(protest.id);
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
                <div
                    className='w-[30px] h-[35px] bg-[url(/images/marker.png)] bg-center bg-no-repeat bg-contain relative cursor-pointer'
                    onClick={() =>
                        onMarkerClick(protest.id, protest.locations[0].latitude, protest.locations[0].longitude)
                    }
                >
                    {/* <div className='absolute top-[10px] left-1/2 -translate-x-1/2 text-white text-[10px] font-bold'>
                        {verifiedNumber}
                    </div> */}
                    {cheerCountCalculater && (
                        <div className='absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center'>
                            {(effect || isRealtimeCheer) && (
                                <div
                                    className={`animate-bounce ${
                                        isRealtimeCheer ? 'text-red-500' : ''
                                    } text-[16px] absolute bottom-6`}
                                >
                                    🔥
                                </div>
                            )}
                            <span className='text-[10px]'>{cheerCountCalculater}</span>
                        </div>
                    )}
                </div>
            </CustomOverlayMap>
        </>
    );
}
