/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Map, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import ProtestVerificationBadge from '@/components/Protest/ProtestVerificationBadge';
import { ProtestData } from '@/types';
import { calculateRealDistanceOnePixel } from '@/lib/utils';

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
    const [heatmapInstance, setHeatmapInstance] = useState<any>(null);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const router = useRouter();
    const animationFrameRef = useRef<number | null>(null);
    const isUpdatingRef = useRef(false);
    const [realXDistance, setRealXDistance] = useState<number | null>();

    useEffect(() => {
        if (!mapInstance || !protests) return;
        const updateBounds = () => {
            const SEOUL_CENTER_LONGITUDE = 127.0016985;

            const { ha, qa, oa, pa } = mapInstance.getBounds();
            const d =
                calculateRealDistanceOnePixel(ha, SEOUL_CENTER_LONGITUDE, oa, SEOUL_CENTER_LONGITUDE) /
                window.innerWidth;
            setRealXDistance((prev) => {
                if (prev === d) return prev;
                return d;
            });
        };
        updateBounds();
        window.kakao.maps.event.addListener(mapInstance, 'bounds_changed', updateBounds);
        return () => {
            window.kakao.maps.event.removeListener(mapInstance, 'bounds_changed', updateBounds);
        };
    }, [mapInstance, protests]);

    const updateHeatmap = useCallback(() => {
        if (!heatmapInstance || !mapInstance || !realXDistance) return;
        isUpdatingRef.current = true;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const projection = mapInstance.getProjection();
            const bounds = mapInstance.getBounds();

            const heatmapData = protests
                .map((protest) => {
                    const latLng = new window.kakao.maps.LatLng(
                        protest.locations[0].latitude,
                        protest.locations[0].longitude
                    );

                    const pixel = projection.pointFromCoords(latLng);
                    return {
                        x: pixel.x - projection.pointFromCoords(bounds.getSouthWest()).x,
                        y: pixel.y - projection.pointFromCoords(bounds.getNorthEast()).y,
                        value: protest.declaredParticipants,
                        radius: protest.radius / realXDistance,
                    };
                })
                .filter(Boolean);

            heatmapInstance.setData({
                max: 10000,
                min: 100,
                data: heatmapData,
            });
            const canvas = heatmapInstance._renderer.canvas;
            if (canvas) {
                canvas.style.display = 'block';
                canvas.style.opacity = '1';
                canvas.style.zIndex = '10';
                canvas.style.pointerEvents = 'none';
            }
        });

        isUpdatingRef.current = false;
    }, [heatmapInstance, mapInstance, protests, realXDistance]);

    const registerMapEvents = useCallback(() => {
        if (!mapInstance) return;

        window.kakao.maps.event.addListener(mapInstance, 'zoom_start', () => {
            updateHeatmap();
        });

        window.kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
            updateHeatmap();
        });

        window.kakao.maps.event.addListener(mapInstance, 'zoom_changed', () => {
            updateHeatmap();
        });
    }, [mapInstance, updateHeatmap, realXDistance]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!mapInstance || heatmapInstance) return;

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/heatmap.js';
        script.async = true;
        script.onload = () => {
            const container = document.getElementById('map');
            if (!container) return;

            const heatmap = (window as any).h337.create({
                container,
                maxOpacity: 0.4,
                minOpacity: 0.1,
                blur: 0.95,
            });

            setHeatmapInstance(heatmap);

            const canvas = heatmap._renderer.canvas;
            if (canvas) {
                canvas.style.zIndex = '10';
                canvas.style.pointerEvents = 'none';
            }
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [mapInstance, heatmapInstance]);

    useEffect(() => {
        if (!mapInstance) return;

        registerMapEvents();

        return () => {
            if (mapInstance) {
                window.kakao.maps.event.removeListener(mapInstance, 'zoom_start', updateHeatmap);
                window.kakao.maps.event.removeListener(mapInstance, 'center_changed', updateHeatmap);
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            }
        };
    }, [mapInstance, registerMapEvents]);

    useEffect(() => {
        if (heatmapInstance && mapInstance) {
            updateHeatmap();
        }
    }, [heatmapInstance, mapInstance, updateHeatmap]);

    if (!isClient) return <div>Loading ...</div>;
    if (loading) return <div>Loading ... loading</div>;
    if (error) return <div>Loading ... error</div>;

    return (
        <div>
            <Map
                id='map'
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
                onCreate={setMapInstance}
            >
                {protests.map((protest) => (
                    <div key={protest.id}>
                        <ProtestVerificationBadge protest={protest} mapInstance={mapInstance} router={router} />
                    </div>
                ))}
                <MapTypeControl position={'TOPLEFT'} />
                <ZoomControl position={'LEFT'} />
            </Map>
        </div>
    );
}
