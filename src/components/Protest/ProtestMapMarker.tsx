import { useEffect, useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { ProtestData } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getVerificationNumber } from '@/apis/verification';
import { useCheerEffect } from '@/hooks/useCheerEffect';
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

    const { data } = UseProtestCheerCount(protest.id);
    const { effect } = useCheerEffect(data);
    console.log('data', data);

    return (
        <div>
            <CustomOverlayMap
                position={{
                    lat: protest.locations[0].latitude,
                    lng: protest.locations[0].longitude,
                }}
                yAnchor={1}
                zIndex={dynamicZIndex}
            >
                <div
                    className=' p-5  bg-[url(/images/marker.png)] bg-center bg-no-repeat bg-contain  cursor-pointer  flex flex-col items-center justify-center'
                    onClick={() =>
                        onMarkerClick(protest.id, protest.locations[0].latitude, protest.locations[0].longitude)
                    }
                >
                    {effect && <div className='absolute bottom-10'>🔥</div>}
                    <span className='text-xs pb-2 font-sans font-bold'>{numberTransfer(data?.cheerCount || 0)}</span>
                </div>
            </CustomOverlayMap>
        </div>
    );
}
