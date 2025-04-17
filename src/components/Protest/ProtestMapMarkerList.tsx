import ProtestMapMarker from '@/components/Protest/ProtestMapMarker';
import { ProtestData } from '@/types/protest';

export const ProtestMapMarkerList = ({
  protests,
  mapInstance,
  router,
}: {
  protests: ProtestData[];
  mapInstance: any;
  router: any;
}) => {
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
