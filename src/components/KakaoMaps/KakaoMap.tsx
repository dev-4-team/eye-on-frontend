/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CustomOverlayMap, Map, MapMarker, MapTypeControl, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ProtestData } from '@/types';
import VerificationBadge from '../Protest/verification-badge';
import { Button } from '../ui/button';
import { MdGpsFixed } from 'react-icons/md';
import { BiReset } from 'react-icons/bi';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { Loader2 } from 'lucide-react';

type RouteData = [number, number][];

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
    const [routeData, setRouteData] = useState<any>(null);
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [agreed, setAgreed] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [typeOfButton, setTypeOfButton] = useState('');
    const router = useRouter();
    const animationFrameRef = useRef<number | null>(null);
    const isUpdatingRef = useRef(false);
    const { curLocation, isLoading, errorMsg } = useGeoLocation(agreed);

    const onMarkerClick = (id: string, lat: number, long: number) => {
        if (mapInstance) {
            const destLatLng = new kakao.maps.LatLng(lat, long);
            mapInstance.panTo(destLatLng);
        }
        router.push(`/protest/${id}`);
    };

    const onButtonClick = (type: string) => {
        setButtonClicked(true);
        if (mapInstance) {
            if (type === 'gps') {
                setAgreed(true);
                setTypeOfButton('gps');
            } else {
                setTypeOfButton('reset');
            }
            const destLatLng = new kakao.maps.LatLng(latitude, longitude);
            mapInstance.panTo(destLatLng);
        }
    };

    useEffect(() => {
        if (!isLoading && curLocation && mapInstance) {
            if (typeOfButton === 'gps') {
                const destLatLng = new kakao.maps.LatLng(curLocation.latitude, curLocation.longitude);
                mapInstance.panTo(destLatLng);
                setAgreed(false);
                setButtonClicked(false);
            } else {
                const destLatLng = new kakao.maps.LatLng(37.539581447331, 127.00787604008);
                mapInstance.panTo(destLatLng);
                setButtonClicked(false);
            }
        }
    }, [agreed, isLoading, curLocation, mapInstance, buttonClicked]);

    const updateHeatmap = useCallback(() => {
        if (!heatmapInstance || !mapInstance) return;

        setCurrentLevel(mapInstance.getLevel());

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
                        radius: protest.radius * 0.1,
                    };
                })
                .filter(Boolean);

            heatmapInstance.setData({
                max: 10000,
                min: 100,
                data: heatmapData,
            });
        });

        isUpdatingRef.current = false;
    }, [heatmapInstance, mapInstance, protests]);

    const registerMapEvents = useCallback(() => {
        if (!mapInstance) return;

        window.kakao.maps.event.addListener(mapInstance, 'zoom_start', updateHeatmap);
        window.kakao.maps.event.addListener(mapInstance, 'center_changed', updateHeatmap);
    }, [mapInstance, updateHeatmap]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!mapInstance) return;
        setCurrentLevel(mapInstance.getLevel());
    }, [mapInstance]);

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

    const fetchRoute = async (start: string, goal: string, waypoints?: string) => {
        const url = new URL(`/api/directions/route`, window.location.origin);
        url.searchParams.append('start', start);
        url.searchParams.append('goal', goal);

        if (waypoints) {
            url.searchParams.append('waypoints', waypoints);
        }

        const res = await fetch(url.toString());
        const data = await res.json();
        return data.route.trafast[0].path;
    };

    const fetchMultipleRoutes = async (protests: ProtestData[]) => {
        const results = await Promise.all(
            protests
                .filter(({ locations }) => locations.length >= 2)
                .map(({ locations }) => {
                    const start = `${locations[0].longitude},${locations[0].latitude}`;
                    const goal = `${locations[locations.length - 1].longitude},${
                        locations[locations.length - 1].latitude
                    }`;
                    const waypoints =
                        locations
                            .slice(1, -1)
                            .map((loc) => `${loc.longitude},${loc.latitude}`)
                            .join('|') || undefined;

                    return fetchRoute(start, goal, waypoints);
                })
        );
        return results;
    };

    const handleFetchRoutes = async () => {
        const routes = await fetchMultipleRoutes(protests);
        setRouteData(routes);
    };

    const generateColorFromIndex = (index: number): string => {
        const r = (index * 50) % 256;
        const g = (index * 100) % 256;
        const b = (index * 150) % 256;
        return `rgb(${r}, ${g}, ${b})`;
    };

    useEffect(() => {
        handleFetchRoutes();
    }, [protests]);

    if (!isClient) return <div>Loading ...</div>;
    if (loading) return <div>Loading ... loading</div>;
    if (error) return <div>Loading ... error</div>;
    if (!routeData) return <div>Loading...</div>;

    return (
        <div>
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
                onCreate={setMapInstance}
            >
                {protests.map((protest) => (
                    <div key={protest.id}>
                        <CustomOverlayMap
                            position={{
                                lat: protest.locations[0].latitude,
                                lng: protest.locations[0].longitude,
                            }}
                            yAnchor={3}
                        >
                            <VerificationBadge protestId={protest.id} />
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
                            onClick={() =>
                                onMarkerClick(protest.id, protest.locations[0].latitude, protest.locations[0].longitude)
                            }
                        />
                    </div>
                ))}

                {currentLevel <= 8
                    ? routeData.map((data: RouteData, index: number) => (
                          <Polyline
                              key={index}
                              endArrow={true}
                              path={data.map(([lng, lat]) => ({ lat, lng }))}
                              strokeWeight={5}
                              strokeColor={generateColorFromIndex(index)}
                              strokeOpacity={0.7}
                              strokeStyle="solid"
                          />
                      ))
                    : null}

                <MapTypeControl position={'TOPLEFT'} />
                <ZoomControl position={'LEFT'} />
            </Map>
            <Button
                className="absolute bottom-7 left-3 z-30"
                variant={'gps'}
                size={'gps'}
                onClick={() => onButtonClick('gps')}
            >
                {isLoading ? <Loader2 className="animate-spin" /> : <MdGpsFixed />}
            </Button>
            <Button
                className="absolute bottom-20 left-3 z-30"
                variant={'reset'}
                size={'gps'}
                onClick={() => onButtonClick('reset')}
            >
                <BiReset />{' '}
            </Button>
        </div>
    );
}
