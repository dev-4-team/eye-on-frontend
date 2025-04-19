'use client';

import { LocationType } from '@/types/location';
import { useCallback, useEffect, useState } from 'react';

export const useGeoLocation = (permissionStatus: boolean) => {
  const [location, setLocation] = useState<LocationType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const setDefaultLocation = () => {
    const defaultLatitude = 37.579293849225756;
    const defaultLongitude = 126.97798076343491;
    setLocation({
      latitude: defaultLatitude,
      longitude: defaultLongitude,
    });
  };

  const showError = useCallback((error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorMsg('사용자가 위치 정보를 제공허는 것을 거부했습니다. ');
        setDefaultLocation();
        break;
      case error.POSITION_UNAVAILABLE:
        setErrorMsg('위치 정보를 사용할 수 없습니다.');
        break;
      case error.TIMEOUT:
        setErrorMsg('위치 정보를 가져오는 요청이 시간 초과되었습니다.');
        break;
      default:
        setErrorMsg('알 수 없는 오류가 발생했습니다.');
        break;
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!permissionStatus) return;
    const { geolocation } = navigator;
    if (!geolocation) return;
    setIsLoading(true);

    geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        setIsLoading(false);
      },
      err => showError(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, [showError, permissionStatus]);

  return {
    curLocation: location,
    isLoading,
    errorMsg,
  };
};
