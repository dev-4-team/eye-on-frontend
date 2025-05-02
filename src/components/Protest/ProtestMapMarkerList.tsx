import ProtestMapMarker from '@/components/Protest/ProtestMapMarker';
import type { Protest } from '@/types/protest';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
  protests: Protest[];
  mapInstance: kakao.maps.Map;
  router: AppRouterInstance;
}

const ProtestMapMarkerList = ({ protests, mapInstance, router }: Props) => {
  return (
    <div>
      {protests.map(protest => (
        <div key={protest.id} className='flex justify-center items-center'>
          <ProtestMapMarker protest={protest} mapInstance={mapInstance} router={router} />
        </div>
      ))}
    </div>
  );
};

export default ProtestMapMarkerList;
