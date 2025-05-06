import type { Coordinate } from '@/types/kakaoMap';
import { MapMarker } from 'react-kakao-maps-sdk';

interface Props {
  currentPositionMarker: Coordinate | null;
}

const CurrentMapMarker = ({ currentPositionMarker }: Props) => {
  if (!currentPositionMarker) return null;
  return (
    <MapMarker position={{ lat: currentPositionMarker.lat, lng: currentPositionMarker.lng }} />
  );
};
export default CurrentMapMarker;
