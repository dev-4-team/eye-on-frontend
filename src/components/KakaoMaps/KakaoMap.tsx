'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { ProtestData } from '@/types';
import { calculateRealDistanceOnePixel } from '@/lib/utils';
import { CurrentLocationButton } from '@/components/Button/CurrentLocationButton';
import { CurrentLocationRestButton } from '@/components/Button/CurrentLocationRestButton';
import { NavigationRouteLines } from '@/components/NaverDirections/NavigationRouteLines';
import { ProtestMapMarkerList } from '@/components/Protest/ProtestMapMarkerList';
import { toast } from 'sonner';

export type RouteData = [number, number][];

type CurrentPosition = {
  lat: number;
  long: number;
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
  const [loading, error] = useKakaoLoader();
  const [heatmapInstance, setHeatmapInstance] = useState<any>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentPositionMarker, setCurrentPositionMarker] = useState<CurrentPosition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      setRealXDistance(prev => {
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

  const onGpsButtonClick = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        const destLatLng = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        setCurrentPositionMarker({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setIsLoading(false);
        mapInstance.setLevel(3);
        mapInstance.panTo(destLatLng);
        toast.success('위치 정보 가져오기 성공');
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('현재 위치를 가져올 수 없습니다.', {
              description: '위치 접근 권한이 필요합니다. 브라우저 설정을 확인해주세요.',
            });
            setIsLoading(false);
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('현재 위치를 가져올 수 없습니다.', {
              description: '현재 위치를 확인할 수 없습니다. GPS 상태를 확인해주세요.',
            });
            setIsLoading(false);
            break;
          case error.TIMEOUT:
            toast.error('현재 위치를 가져올 수 없습니다.', {
              description: '위치 요청 시간이 초과되었습니다. 다시 시도해주세요.',
            });
            setIsLoading(false);
            break;
          default:
            toast.error('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
            setIsLoading(false);
            break;
        }
        console.error('위치 가져오기 실패', error);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const onResetButtonClick = () => {
    if (mapInstance) {
      const destLatLng = new kakao.maps.LatLng(37.57297651, 126.9743513);
      setCurrentPositionMarker({ lat: 0, long: 0 });
      mapInstance.setLevel(5);
      mapInstance.panTo(destLatLng);
      toast.success('초기 위치로 이동!');
    }
  };

  const updateHeatmap = useCallback(() => {
    if (!heatmapInstance || !mapInstance || !realXDistance) return;

    setCurrentLevel(mapInstance.getLevel());

    isUpdatingRef.current = true;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const projection = mapInstance.getProjection();
      const bounds = mapInstance.getBounds();

      const heatmapData = protests
        .map(protest => {
          const latLng = new window.kakao.maps.LatLng(
            protest.locations[0].latitude,
            protest.locations[0].longitude,
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
        window.kakao.maps.event.removeListener(mapInstance, 'zoom_changed', updateHeatmap);
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
    const url = new URL(`/next-api/directions/route`, window.location.origin);
    url.searchParams.append('start', start);
    url.searchParams.append('goal', goal);

    if (waypoints) {
      url.searchParams.append('waypoints', waypoints);
    }
    try {
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.code === 0) {
        return data.route ? data.route.trafast[0].path : [];
      }
      if (data.code === 1) {
        return [];
      }
    } catch (e) {
      return [];
    }
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
            Array.from(
              new Set(locations.slice(1, -1).map(loc => `${loc.longitude},${loc.latitude}`)),
            ).join('|') || undefined;
          return fetchRoute(start, goal, waypoints);
        }),
    );
    return results;
  };

  const handleFetchRoutes = async () => {
    const routes = await fetchMultipleRoutes(protests);
    setRouteData(routes);
  };

  useEffect(() => {
    handleFetchRoutes();
  }, [protests]);

  if (loading) return <div>Loading ... loading</div>;
  if (error) return <div>Loading ... error</div>;
  if (!routeData) return <div>Loading...</div>;

  return (
    <div className='relative'>
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
        {currentLevel <= 8 && <NavigationRouteLines routeData={routeData} />}
        {currentPositionMarker && (
          <MapMarker
            position={{ lat: currentPositionMarker.lat, lng: currentPositionMarker.long }}
          />
        )}
        <ProtestMapMarkerList protests={protests} mapInstance={mapInstance} router={router} />
        <MapTypeControl position={'TOPLEFT'} />
        <ZoomControl position={'LEFT'} />
      </Map>
      <CurrentLocationButton onClick={() => onGpsButtonClick()} isLoading={isLoading} />
      <CurrentLocationRestButton onClick={() => onResetButtonClick()} />
    </div>
  );
}
