import ProtestMapMarker from '@/components/Protest/ProtestMapMarker';
import type { Protest } from '@/types/protest';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ProtestMapMarkerListProps {
  currentZoomLevel: number;
  clusterMinLevel: number;
  protests: Protest[];
  mapInstance: kakao.maps.Map | null;
  router: AppRouterInstance;
}

const ProtestMapMarkerList = ({
  currentZoomLevel,
  clusterMinLevel,
  protests,
  mapInstance,
  router,
}: ProtestMapMarkerListProps) => {
  if (currentZoomLevel >= clusterMinLevel || !mapInstance) return null;
  return (
    <>
      {protests.map(protest => (
        <ProtestMapMarker
          key={protest.id}
          protest={protest}
          mapInstance={mapInstance}
          router={router}
        />
      ))}
    </>
  );
};

export default ProtestMapMarkerList;
