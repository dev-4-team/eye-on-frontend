import { SEOUL_CENTER_LATITUDE, SEOUL_CENTER_LONGITUDE } from '@/constants/map'
import type { Coordinate } from '@/types/kakaoMap'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  mapInstance: kakao.maps.Map | null
}

export const useCurrentLocation = ({ mapInstance }: Props) => {
  const [currentPositionMarkerCoordinate, setCurrentPositionMarkerCoordinate] =
    useState<Coordinate | null>(null)
  const [isFetchingLocation, setIsFetchingLocation] = useState(false)

  const handleMoveCurrentLocation = () => {
    if (!mapInstance) return
    if (!navigator.geolocation) {
      toast.error('이 브라우저에서는 위치 서비스를 지원하지 않습니다.')
      return
    }
    setIsFetchingLocation(true)
    navigator.geolocation.getCurrentPosition(
      position => {
        const destLatLng = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        )
        setCurrentPositionMarkerCoordinate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsFetchingLocation(false)
        mapInstance.setLevel(3)
        mapInstance.panTo(destLatLng)
        toast.success('위치 정보 가져오기 성공')
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('현재 위치를 가져올 수 없습니다.', {
              description: '위치 접근 권한이 필요합니다. 브라우저 설정을 확인해주세요.',
            })
            setIsFetchingLocation(false)
            break
          case error.POSITION_UNAVAILABLE:
            toast.error('현재 위치를 가져올 수 없습니다.', {
              description: '현재 위치를 확인할 수 없습니다. GPS 상태를 확인해주세요.',
            })
            setIsFetchingLocation(false)
            break
          case error.TIMEOUT:
            toast.error('현재 위치를 가져올 수 없습니다.', {
              description: '위치 요청 시간이 초과되었습니다. 다시 시도해주세요.',
            })
            setIsFetchingLocation(false)
            break
          default:
            toast.error('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.')
            setIsFetchingLocation(false)
            break
        }
        console.error('위치 가져오기 실패', error)
        setIsFetchingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const handleResetCurrentLocation = () => {
    if (mapInstance) {
      const destLatLng = new kakao.maps.LatLng(SEOUL_CENTER_LATITUDE, SEOUL_CENTER_LONGITUDE)
      setCurrentPositionMarkerCoordinate({ lat: 0, lng: 0 })
      mapInstance.setLevel(5)
      mapInstance.panTo(destLatLng)
      toast.success('초기 위치로 이동!')
    }
  }

  return {
    currentPositionMarkerCoordinate,
    isFetchingLocation,
    handleMoveCurrentLocation,
    handleResetCurrentLocation,
  }
}
