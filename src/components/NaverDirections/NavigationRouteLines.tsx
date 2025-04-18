import { Polyline } from 'react-kakao-maps-sdk';
import { RouteData } from '@/types/naverRoute';
import { generateColorFromIndex } from '@/lib/utils';

interface Props {
  routeData: RouteData[];
}
const NavigationRouteLines = ({ routeData }: Props) => {
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
