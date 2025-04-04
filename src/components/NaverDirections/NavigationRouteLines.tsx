import { RouteData } from '@/components/KakaoMaps/KakaoMap';
import { generateColorFromIndex } from '@/lib/utils';
import { Polyline } from 'react-kakao-maps-sdk';

export const NavigationRouteLines = ({ routeData }: { routeData: RouteData[] }) => {
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
