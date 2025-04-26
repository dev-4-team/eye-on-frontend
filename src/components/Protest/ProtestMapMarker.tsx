import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { EMOJI } from '@/constants/emojis';
import { numberTransfer } from '@/lib/utils';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerCount } from '@/hooks/useProtestCheerCount';
import type { Protest } from '@/types/protest';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
interface Props {
  protest: Protest;
  mapInstance: kakao.maps.Map;
  router: AppRouterInstance;
}

const ProtestMapMarker = ({ protest, mapInstance, router }: Props) => {
  const { data, isLoading, isError } = useProtestCheerCount({ protestId: protest.id });
  const { effect } = useCheerEffect(data);
  const location = protest.locations[0];

  const onMarkerClick = (id: string, lat: number, long: number) => {
    if (mapInstance) {
      mapInstance.setLevel(4);
      const destLatLng = new kakao.maps.LatLng(lat, long);
      mapInstance.panTo(destLatLng);
    }
    router.push(`/protest/${id}`);
  };

  if (!location) {
    // TODO: 위치 정보가 없는 경우에 대한 예외 처리 (예: 로그, fallback UI 등)
    return null;
  }
  return (
    <div>
      <CustomOverlayMap
        position={{
          lat: location.latitude,
          lng: location.longitude,
        }}
        yAnchor={1}
      >
        <div
          className=' p-5  bg-[url(/images/marker.png)] bg-center bg-no-repeat bg-contain  cursor-pointer  flex flex-col items-center justify-center'
          onClick={() => onMarkerClick(protest.id, location.latitude, location.longitude)}
        >
          {effect && <div className='absolute bottom-10'>{EMOJI.FIRE}</div>}
          <span className='text-xs pb-2 font-sans font-bold'>
            {isLoading
              ? `${EMOJI.FIRE}...`
              : isError || !data
                ? '0'
                : numberTransfer(data.cheerCount)}
          </span>
        </div>
      </CustomOverlayMap>
    </div>
  );
};

export default ProtestMapMarker;
