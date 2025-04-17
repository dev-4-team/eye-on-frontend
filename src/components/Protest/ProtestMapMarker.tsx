import { useEffect, useState } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';
import { numberTransfer } from '@/lib/utils';
import { ProtestData } from '@/types/protest';
import { getVerificationNumber } from '@/api/verification';

export default function ProtestMapMarker({
  protest,
  mapInstance,
  router,
}: {
  protest: ProtestData;
  mapInstance: any;
  router: AppRouterInstance;
}) {
  const [verifiedNumber, setVerifiedNumber] = useState(0);

  useEffect(() => {
    const verifyNumber = async () => {
      const result = await getVerificationNumber(protest.id);
      setVerifiedNumber(result.verifiedNum);
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
  const { data, isLoading, isError } = UseProtestCheerCount(protest.id);
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
          {effect && <div className='absolute bottom-10'>🔥</div>}
          <span className='text-xs pb-2 font-sans font-bold'>
            {isLoading ? '🔥 ...' : isError || !data ? '0' : numberTransfer(data.cheerCount)}
          </span>
        </div>
      </CustomOverlayMap>
    </div>
  );
}
