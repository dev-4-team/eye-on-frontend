import { StaticMap } from 'react-kakao-maps-sdk';

export default function StaticKakakoMap({
    latitude,
    longitude,
    w,
    h,
    l,
}: {
    latitude: number;
    longitude: number;
    w: string;
    h: string;
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
