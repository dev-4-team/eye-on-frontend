'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { toast } from 'sonner';
import MapErrorFallback from '@/components/KakaoMaps/MapErrorFallback';
import KakaoMapClusterer from '@/components/KakaoMaps/KakaoMapClusterer';
import MapLoadingFallback from '@/components/KakaoMaps/MapLoadingFallback';
import ProtestMapMarkerList from '@/components/Protest/ProtestMapMarkerList';
import NavigationRouteLines from '@/components/NaverDirections/NavigationRouteLines';
import CurrentLocationButton from '@/components/Button/CurrentLocationButton';
import CurrentLocationRestButton from '@/components/Button/CurrentLocationRestButton';
import type { Protest } from '@/types/protest';
import type { Coordinate } from '@/types/kakaoMap';
import { useHeatMap } from '@/hooks/useHeatMap';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useNavigationRoutes } from '@/hooks/useNavigationRoutes';
import { getProtestList } from '@/api/protest';
import { CLUSTER_MIN_LEVEL } from '@/constants/clusterConfig';
import {
  INITIAL_MAP_CENTER,
  INITIAL_ZOOM_LEVEL,
  SEOUL_CENTER_LATITUDE,
  SEOUL_CENTER_LONGITUDE,
} from '@/constants/map';
const KakaoMap = () => {
  const [protests, setProtests] = useState<Protest[]>([]);
  const [loading, error] = useKakaoLoader();
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentPositionMarker, setCurrentPositionMarker] = useState<Coordinate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const { routesData } = useNavigationRoutes({ protests });
  useHeatMap({ mapInstance, protests });
  const filteredProtests = protests.filter(p => p.locations?.length > 0);
  useEffect(() => {
    const fetchProtests = async () => {
      const protests = await getProtestList();
      setProtests(protests);
    };
    fetchProtests();
  }, []);

  const onGpsButtonClick = () => {
    if (!mapInstance) return;
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
      const destLatLng = new kakao.maps.LatLng(SEOUL_CENTER_LATITUDE, SEOUL_CENTER_LONGITUDE);
      setCurrentPositionMarker({ lat: 0, long: 0 });
      mapInstance.setLevel(5);
      mapInstance.panTo(destLatLng);
      toast.success('초기 위치로 이동!');
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  if (loading || !routesData) return <MapLoadingFallback />;
  if (error) return <MapErrorFallback />;

  return (
    <div className='relative'>
      <Map
        id='map'
        center={{
          lat: INITIAL_MAP_CENTER.lat,
          lng: INITIAL_MAP_CENTER.lng,
        }}
        style={{
          margin: '0 auto',
          width: '100%',
          height: 'calc(100dvh - 14vh)',
        }}
        level={INITIAL_ZOOM_LEVEL}
        onCreate={setMapInstance}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onZoomChanged={map => {
          setCurrentLevel(map.getLevel());
        }}
      >
        {currentLevel <= 8 && !isDragging && <NavigationRouteLines routeData={routesData} />}
        {currentPositionMarker && (
          <MapMarker
            position={{ lat: currentPositionMarker.lat, lng: currentPositionMarker.long }}
          />
        )}
        {currentLevel < CLUSTER_MIN_LEVEL && (
          <ProtestMapMarkerList
            protests={filteredProtests}
            mapInstance={mapInstance!}
            router={router}
          />
        )}
        <KakaoMapClusterer protests={filteredProtests} />
        <MapTypeControl position={'TOPLEFT'} />
        <ZoomControl position={'LEFT'} />
      </Map>
      <CurrentLocationButton onClick={() => onGpsButtonClick()} isLoading={isLoading} />
      <CurrentLocationRestButton onClick={() => onResetButtonClick()} />
    </div>
  );
};

export default KakaoMap;
