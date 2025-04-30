import { throttle } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { type Protest } from '@/types/protest';

interface Props {
  mapInstance: kakao.maps.Map | null;
  heatmapInstance: any;
  protests: Protest[];
  realXDistance: number | null | undefined;
}

export const useThrottledHeatmapUpdate = ({
  mapInstance,
  heatmapInstance,
  protests,
  realXDistance,
}: Props) => {
  const animationFrameRef = useRef<number | null>(null); //rAF 예약 Id 저장용

  const updateHeatmap = useCallback(() => {
    // 실제 heatmap 데이터를 계산하고 setData()로 업데이트 하는 함수
    if (!mapInstance || !heatmapInstance || !realXDistance) return;

    const projection = mapInstance.getProjection(); // 지도의 위 경도를 화변의 픽셀 좌표로 변경
    const bounds = mapInstance.getBounds(); // 현재 눈에 보이는 뷰포트 기준 사각형

    const heatmapData = protests
      .filter(protest => protest.locations && protest.locations.length > 0)
      .map(protest => {
        const location = protest.locations[0];
        if (!location) return null;
        const latLng = new window.kakao.maps.LatLng(location.latitude, location.longitude); // 시위 위치의 위 경도를 LatLng 객체로 변환

        if (!bounds.contain(latLng)) return null; // 현재 뷰포트에 포함되지 않는다면 null 리턴

        const pixel = projection.pointFromCoords(latLng);
        const swPixel = projection.pointFromCoords(bounds.getSouthWest());
        const nePixel = projection.pointFromCoords(bounds.getNorthEast());

        return {
          // 왼쪽 위 (0,0) 기준 위경도를 픽셀좌표로 바꾸어
          x: pixel.x - swPixel.x, // 연산 지도 좌하단에서 얼마나 떨어졌는지
          y: pixel.y - nePixel.y, // 지도 우상단에서 얼마나 떨어졌는지
          value: protest.declaredParticipants,
          radius: Math.max(10, (protest.radius || 50) / realXDistance), // 최소 범위를 10으로 보장한다
        }; // 히트맵 용 {x, y, value, radius}
      })
      .filter(Boolean); // 혹여 null, undefined 제거

    heatmapInstance.setData({
      max: 10000,
      min: 100,
      data: heatmapData,
    });
  }, [mapInstance, heatmapInstance, protests, realXDistance]);

  const throttledUpdate = useMemo(() => {
    // 고차함수인 throttle()의 리턴 된 fn을 캐싱
    return throttle(() => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        updateHeatmap();
        animationFrameRef.current = null;
      });
    }, 100);
  }, [updateHeatmap]);

  useEffect(() => {
    if (heatmapInstance && mapInstance) {
      updateHeatmap();
    }
  }, [heatmapInstance, mapInstance, updateHeatmap]);

  const handleHideHeatmap = useCallback(() => {
    if (!heatmapInstance) return;
    heatmapInstance._renderer.canvas.style.opacity = '0';
  }, [heatmapInstance]);

  const handleShowHeatmap = useCallback(() => {
    if (!mapInstance || !heatmapInstance) return;
    const level = mapInstance.getLevel();
    if (level > 10) {
      heatmapInstance._renderer.canvas.style.opacity = '0';
    } else {
      heatmapInstance._renderer.canvas.style.opacity = '1';
    }
  }, [mapInstance, heatmapInstance]);

  useEffect(() => {
    if (!mapInstance || !heatmapInstance) return;

    kakao.maps.event.addListener(mapInstance, 'center_changed', throttledUpdate);
    kakao.maps.event.addListener(mapInstance, 'zoom_start', handleHideHeatmap);
    kakao.maps.event.addListener(mapInstance, 'zoom_changed', handleShowHeatmap);
    kakao.maps.event.addListener(mapInstance, 'drag', throttledUpdate);

    return () => {
      kakao.maps.event.removeListener(mapInstance, 'center_changed', throttledUpdate);
      kakao.maps.event.removeListener(mapInstance, 'zoom_start', handleHideHeatmap);
      kakao.maps.event.removeListener(mapInstance, 'zoom_changed', handleShowHeatmap);
      kakao.maps.event.removeListener(mapInstance, 'drag', throttledUpdate);

      if (animationFrameRef.current) {
        // 이미 예약된 rAF가 있다면 취소
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mapInstance, heatmapInstance, throttledUpdate, handleHideHeatmap, handleShowHeatmap]); // eslint-disable-line react-hooks/exhaustive-deps
};
