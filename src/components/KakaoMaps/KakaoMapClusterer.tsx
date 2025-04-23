import { MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { CLUSTER_MIN_LEVEL, clusterCalculator, clusterStyles } from '@/constants/clusterConfig';
import { Protest } from '@/types/protest';

interface Props {
  protests: Protest[];
}

const KakaoMapClusterer = ({ protests }: Props) => {
  return (
    <MarkerClusterer
      averageCenter={true}
      // minLevel보다 줌 레벨 정도가 작을때만 클러스터러가 적용됩니다.
      minLevel={CLUSTER_MIN_LEVEL}
      calculator={clusterCalculator}
      styles={clusterStyles}
    >
      {protests.map(protest => {
        return (
          // 시위 계산을 위한 마커입니다.
          <MapMarker
            key={`map-maker-${protest.id}`}
            position={{
              lat: protest.locations[0].latitude,
              lng: protest.locations[0].longitude,
            }}
            opacity={0}
          />
        );
      })}
    </MarkerClusterer>
  );
};

export default KakaoMapClusterer;
