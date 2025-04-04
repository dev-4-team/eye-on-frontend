import ProtestMapMarker from '@/components/Protest/ProtestMapMarker';
import { ProtestData } from '@/types';

type RouteData = [number, number][];

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
            {protests.map((protest) => (
                <div key={protest.id}>
                    <ProtestMapMarker protest={protest} mapInstance={mapInstance} router={router} />
                </div>
            ))}
        </div>
    );
};
