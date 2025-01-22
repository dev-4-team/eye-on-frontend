import { StaticMap } from 'react-kakao-maps-sdk';

export default function StaticKakakoMap({
    latitude,
    longitude,
    w,
    minW,
    h,
    minH,
    l,
}: {
    latitude: number;
    longitude: number;
    w: string;
    minW: string;
    h: string;
    minH: string;
    l: number;
}) {
    return (
        <StaticMap
            center={{
                lat: latitude,
                lng: longitude,
            }}
            style={{
                margin: '0 auto',
                width: w,
                height: h,
                minWidth: minW,
                minHeight: minH,
            }}
            marker={[
                {
                    position: {
                        lat: latitude,
                        lng: longitude,
                    },
                },
            ]}
            level={l}
        />
    );
}
