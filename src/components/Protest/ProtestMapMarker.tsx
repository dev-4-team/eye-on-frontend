import { useEffect, useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { ProtestData } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getVerificationNumber } from '@/apis/verification';
import { useSocketStore } from '@/store/useSocketStore';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';
import { numberTransfer } from '@/lib/utils';

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
                yAnchor={1}
                zIndex={dynamicZIndex}
            >
                <div
                    className='inline-flex p-5  bg-[url(/images/marker.png)] bg-center bg-no-repeat bg-contain  cursor-pointer  items-center justify-center'
                    onClick={() =>
                        onMarkerClick(protest.id, protest.locations[0].latitude, protest.locations[0].longitude)
                    }
                >
                    {(effect || isRealtimeCheer) && <div>🔥</div>}
                    <span className='text-xs pb-2 font-sans font-bold'>
                        {numberTransfer(cheerCountCalculater || 0)}
                    </span>
                </div>
            </CustomOverlayMap>
        </>
    );
}
