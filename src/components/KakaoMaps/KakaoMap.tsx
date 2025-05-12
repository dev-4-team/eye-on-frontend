'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Map, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import MapErrorFallback from '@/components/KakaoMaps/MapErrorFallback';
import CurrentMapMarker from '@/components/KakaoMaps/CurrentMapMarker';
import KakaoMapClusterer from '@/components/KakaoMaps/KakaoMapClusterer';
import MapLoadingFallback from '@/components/KakaoMaps/MapLoadingFallback';
import ProtestMapMarkerList from '@/components/Protest/ProtestMapMarkerList';
import NavigationRouteLines from '@/components/NaverDirections/NavigationRouteLines';
import CurrentLocationControls from '@/components/KakaoMaps/MapControls';
import type { Protest } from '@/types/protest';
import { useHeatMap } from '@/hooks/useHeatMap';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useNavigationRoutes } from '@/hooks/useNavigationRoutes';
import { INITIAL_MAP_CENTER, INITIAL_ZOOM_LEVEL } from '@/constants/map';
import { CLUSTER_MIN_LEVEL } from '@/constants/clusterConfig';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useMapState } from '@/hooks/useMapState';

interface Props {
  protests: Protest[];
}

const KakaoMap = ({ protests }: Props) => {
  const router = useRouter();
  const { mapIsLoading, mapIsError } = useKakaoLoader();
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);
  const { routesData } = useNavigationRoutes({ protests });
  const {
    currentPositionMarkerCoordinate,
    isFetchingLocation,
    handleMoveCurrentLoacation,
    handleResetCurrentLocation,
  } = useCurrentLocation({ mapInstance });
  useHeatMap({ mapInstance, protests });
  const { currentZoomLevel, isMapDragging, handleDragEnd, handleDragStart, handleZoomChange } =
    useMapState({ mapInstance });

  if (mapIsLoading || !routesData) return <MapLoadingFallback />;
  if (mapIsError) return <MapErrorFallback />;

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
        onZoomChanged={handleZoomChange}
      >
        <NavigationRouteLines
          routeData={routesData}
          currentZoomLevel={currentZoomLevel}
          mapIsDragging={isMapDragging}
        />
        <CurrentMapMarker currentPositionMarker={currentPositionMarkerCoordinate} />
        <ProtestMapMarkerList
          currentZoomLevel={currentZoomLevel}
          clusterMinLevel={CLUSTER_MIN_LEVEL}
          protests={protests}
          mapInstance={mapInstance!}
          router={router}
        />
        <KakaoMapClusterer protests={protests} />
        <MapTypeControl position={'TOPLEFT'} />
        <ZoomControl position={'LEFT'} />
      </Map>
      <CurrentLocationControls
        onLocationCurrent={handleMoveCurrentLoacation}
        onLocationReset={handleResetCurrentLocation}
        isLoadingCurrentLocation={isFetchingLocation}
      />
    </div>
  );
};

export default KakaoMap;
