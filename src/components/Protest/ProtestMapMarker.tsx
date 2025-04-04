import { useEffect, useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { ProtestData } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { VerificationBadge } from '@/components/Protest/VerificationBadge';
import { ProtestCheerBadge } from '@/components/Protest/ProtestCheerBadge';
import { getVerificationNumber } from '@/apis/verification';

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
                <ProtestCheerBadge protestId={protest.id} />
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
