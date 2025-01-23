'use client';

import { Circle, Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtestData } from '@/types';

const getStrokeColorBySize = (participants: number) => {
    if (participants < 300) {
        return '#F1D3FF';
    } else if (participants < 500) {
        return '#75B8FA';
    } else if (participants < 1000) {
        return '#92FF6c';
    } else if (participants < 2000) {
        return '#FFFA62';
    } else if (participants < 5000) {
        return '#FFB266';
    } else if (participants < 10000) {
        return '#FF8533';
    } else {
        return '#FF3333';
    }
};

const getCircleRadius = (participants: number) => {
    const minRadius = 200;
    const maxRadius = 500;
    const minParticipants = 100;
    const maxParticipants = 500000;

    const logParticipants = Math.log10(participants) - Math.log10(minParticipants);
    const logRange = Math.log10(maxParticipants) - Math.log10(minParticipants);

    const normalizedValue = logParticipants / logRange;

    return minRadius + normalizedValue * (maxRadius - minRadius);
};

export default function KakaoMap({
    latitude,
    longitude,
    w,
    h,
    l,
    protests,
}: {
    latitude: number;
    longitude: number;
    w: string;
    h: string;
    l: number;
    protests: ProtestData[];
}) {
    const [isClient, setIsClient] = useState(false);
    const [loading, error] = useKakaoLoader();

    const router = useRouter();

    const onMarkerClick = (id: string) => {
        router.push(`/protest/${id}`);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading ...</div>;
    }

    if (loading) return <div>Loading ... loading</div>;
    if (error) return <div>Loading ... error</div>;

    return (
        <Map
            id="map"
            center={{
                lat: latitude,
                lng: longitude,
            }}
            style={{
                margin: '0 auto',
                width: w,
                height: h,
            }}
            level={l}
        >
            {protests.map((protest) => (
                <div key={protest.id}>
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
                        onClick={() => onMarkerClick(protest.id)}
                    />
                    <Circle
                        center={{
                            lat: protest.locations[0].latitude,
                            lng: protest.locations[0].longitude,
                        }}
                        radius={getCircleRadius(protest.declaredParticipants)}
                        strokeWeight={2}
                        strokeColor={getStrokeColorBySize(protest.declaredParticipants)}
                        strokeOpacity={0.1}
                        strokeStyle={'solid'}
                        fillColor={getStrokeColorBySize(protest.declaredParticipants)}
                        fillOpacity={0.5}
                    />
                </div>
            ))}
            <MapTypeControl position={'TOPLEFT'} />
            <ZoomControl position={'LEFT'} />
        </Map>
    );
}
