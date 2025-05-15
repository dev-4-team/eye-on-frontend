import { Polyline } from 'react-kakao-maps-sdk';
import type { RouteData } from '@/types/naverRoute';
import { generateColorFromIndex } from '@/lib/utils';

interface Props {
  currentZoomLevel: number;
  mapIsDragging: boolean;
  routeData: RouteData[];
}
const NavigationRouteLines = ({ currentZoomLevel, mapIsDragging, routeData }: Props) => {
  if (currentZoomLevel > 8 || mapIsDragging) return null;
  return routeData.map((data: RouteData, index: number) => (
    <Polyline
      key={index}
      endArrow={true}
      path={data.map(([lng, lat]) => ({ lat, lng }))}
      strokeWeight={5}
      strokeColor={generateColorFromIndex(index)}
      strokeOpacity={0.7}
      strokeStyle='solid'
    />
  ));
};

export default NavigationRouteLines;
