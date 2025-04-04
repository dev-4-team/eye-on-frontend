'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { StaticMap } from 'react-kakao-maps-sdk';

export default function StaticKakaoMap({
    latitude,
    longitude,
    w,
    minW,
    h,
    minH,
    l,
}: {
    latitude: number;
    longitude: number;
    w: string;
    minW: string;
    h: string;
    minH: string;
    l: number;
}) {
    const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

    useEffect(() => {
        const checkKakao = () => {
            if (window.kakao && window.kakao.maps) {
                setIsKakaoLoaded(true);
            } else {
                setTimeout(checkKakao, 100);
            }
        };

        if (typeof window !== 'undefined') {
            if (window.kakao && window.kakao.maps) {
                setIsKakaoLoaded(true);
            } else {
                checkKakao();
            }
        }
    }, []);

    if (!isKakaoLoaded) {
        return <Skeleton className='w-[240px] h-[250px]' />;
    }

    return (
        <StaticMap
            center={{
                lat: latitude,
                lng: longitude,
            }}
            style={{
                margin: '0 auto',
                width: w,
                height: h,
                minWidth: minW,
                minHeight: minH,
            }}
            marker={[
                {
                    position: {
                        lat: latitude,
                        lng: longitude,
                    },
                },
            ]}
            level={l}
        />
    );
}
