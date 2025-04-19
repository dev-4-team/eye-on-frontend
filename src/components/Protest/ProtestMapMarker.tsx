import { useEffect, useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { EMOJI } from '@/constants/emojis';
import { numberTransfer } from '@/lib/utils';
import { getVerificationNumber } from '@/api/verification';
import { useProtestCheerCount } from '@/hooks/useProtestCheerCount';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { Protest } from '@/types/protest';
interface Props {
  protest: Protest;
  mapInstance: any;
  router: AppRouterInstance;
}

const ProtestMapMarker = ({ protest, mapInstance, router }: Props) => {
  const [verifiedNumber, setVerifiedNumber] = useState(0);

  useEffect(() => {
    const verifyNumber = async () => {
      try {
        const result = await getVerificationNumber({ protestId: protest.id });
        setVerifiedNumber(result.verifiedNum);
      } catch (error) {
        console.error('error', error);
      }
    };
    verifyNumber();
  }, [protest]);

  const maxVerified = 5000;
  const baseZIndex = 10;
  const maxZIndex = 100;
  const dynamicZIndex = Math.min(
    maxZIndex,
    baseZIndex + (verifiedNumber / maxVerified) * maxZIndex,
  );

  const onMarkerClick = (id: string, lat: number, long: number) => {
    if (mapInstance) {
      mapInstance.setLevel(4);
      const destLatLng = new kakao.maps.LatLng(lat, long);
      mapInstance.panTo(destLatLng);
    }
    router.push(`/protest/${id}`);
  };
  const { data, isLoading, isError } = useProtestCheerCount({ protestId: protest.id });
  const { effect } = useCheerEffect(data);
  return (
    <div>
      <CustomOverlayMap
        position={{
          lat: protest.locations[0].latitude,
          lng: protest.locations[0].longitude,
        }}
        yAnchor={1}
        zIndex={dynamicZIndex}
      >
        <div
          className=' p-5  bg-[url(/images/marker.png)] bg-center bg-no-repeat bg-contain  cursor-pointer  flex flex-col items-center justify-center'
          onClick={() =>
            onMarkerClick(protest.id, protest.locations[0].latitude, protest.locations[0].longitude)
          }
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
