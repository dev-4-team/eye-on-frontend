import ProtestMapMarker from '@/components/Protest/ProtestMapMarker';
import { Protest } from '@/types/protest';

interface Props {
  protests: Protest[];
  mapInstance: any;
  router: any;
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
